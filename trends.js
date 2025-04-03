// Function to load a single image
function loadImage(imgElement, src) {
    return new Promise((resolve, reject) => {
        imgElement.onload = () => resolve(imgElement);
        imgElement.onerror = () => reject(new Error(`Failed to load image at ${src}`));
        imgElement.src = src;
    });
}

// Function to create a new trend item
function createTrendItem(category, index) {
    const item = document.createElement('div');
    item.className = 'trend-page-item';
    
    const img = document.createElement('img');
    img.alt = `${category} ${index}`;
    
    const info = document.createElement('div');
    info.className = 'trend-page-info';
    
    const title = document.createElement('h4');
    title.textContent = getItemTitle(category, index);
    
    const price = document.createElement('p');
    price.textContent = getItemPrice(category, index);
    
    const button = document.createElement('button');
    button.className = 'buy-btn';
    button.textContent = 'Add to Cart';
    
    info.appendChild(title);
    info.appendChild(price);
    info.appendChild(button);
    item.appendChild(img);
    item.appendChild(info);
    
    return item;
}

// Function to get item title based on category and index
function getItemTitle(category, index) {
    const titles = {
        'Jaipuri Style Kurtis': [
            'Hand Block Print Kurti',
            'Floral Print Kurti',
            'Geometric Print Kurti',
            'Traditional Block Print Kurti',
            'Modern Print Kurti',
            'Designer Block Print Kurti'
        ],
        'Panabi Style Suits': [
            'Embroidered Panabi Suit',
            'Silk Panabi Suit',
            'Designer Panabi Suit',
            'Bridal Panabi Suit',
            'Festival Panabi Suit',
            'Casual Panabi Suit'
        ]
    };
    return titles[category][index % titles[category].length];
}

// Function to get item price based on category and index
function getItemPrice(category, index) {
    const prices = {
        'Jaipuri Style Kurtis': [
            '₹1,499',
            '₹1,299',
            '₹1,799',
            '₹2,199',
            '₹1,899',
            '₹2,499'
        ],
        'Panabi Style Suits': [
            '₹2,999',
            '₹3,499',
            '₹4,999',
            '₹5,999',
            '₹3,999',
            '₹2,999'
        ]
    };
    return prices[category][index % prices[category].length];
}

// Function to load more trend items
async function loadMoreItems() {
    const categories = ['Jaipuri Style Kurtis', 'Panabi Style Suits'];
    const container = document.querySelector('.trend-page-container');
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'trend-page-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        
        const grid = document.createElement('div');
        grid.className = 'trend-page-grid';
        
        // Add 6 new items for each category
        for (let i = 0; i < 6; i++) {
            const newItem = createTrendItem(category, i);
            grid.appendChild(newItem);
        }
        
        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(grid);
        container.appendChild(categoryDiv);
    });
    
    // Load images for new items
    const newImages = container.querySelectorAll('img:not([src])');
    await loadImagesForElements(newImages);
}

// Function to load images for specific elements
async function loadImagesForElements(elements) {
    const promises = [];
    let startIndex = Math.floor(Math.random() * 10) + 1;
    
    elements.forEach(img => {
        const imgPath = `images/imgs1 (${startIndex}).jpg`;
        promises.push(loadImage(img, imgPath));
        startIndex++;
    });
    
    try {
        await Promise.all(promises);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Initial load of images
async function loadInitialImages() {
    const images = document.querySelectorAll('img');
    await loadImagesForElements(images);
}

// Scroll event listener for infinite scroll
let isLoading = false;
window.addEventListener('scroll', () => {
    if (isLoading) return;
    
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    
    // Load more when user is near the bottom (within 200px)
    if (scrollHeight - scrollTop - clientHeight < 200) {
        isLoading = true;
        loadMoreItems().then(() => {
            isLoading = false;
        });
    }
});

// Start the initial load
loadInitialImages(); 