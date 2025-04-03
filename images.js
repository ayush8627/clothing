
const images = document.querySelectorAll("img");


function loadImage(imgElement, src) {
    return new Promise((resolve, reject) => {
        imgElement.onload = () => resolve(imgElement);
        imgElement.onerror = () => reject(new Error(`Failed to load image at ${src}`));
        imgElement.src = src;
    });
}

async function loadImages() {
  let x = Math.floor(Math.random()*10);
  console.log(x);
    let index = x;
    const promises = [];

    images.forEach(img => {
        const imgPath = `images/imgs1 (${index}).jpg`;
        promises.push(loadImage(img, imgPath));
        index++;
    });

    try {
        await Promise.all(promises);
        console.log('सभी इमेज़ सफलतापूर्वक लोड हो गई हैं।');
    } catch (error) {
        console.error(error);
    }
}


loadImages();

// Function to create a new gallery item
function createGalleryItem(collection, index) {
    const item = document.createElement('div');
    item.className = 'gallery-page-item';
    
    const img = document.createElement('img');
    img.alt = `${collection} Design ${index}`;
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-page-overlay';
    
    const title = document.createElement('h3');
    title.textContent = collection;
    
    const description = document.createElement('p');
    description.textContent = getCollectionDescription(collection);
    
    overlay.appendChild(title);
    overlay.appendChild(description);
    item.appendChild(img);
    item.appendChild(overlay);
    
    return item;
}

// Function to get collection description
function getCollectionDescription(collection) {
    const descriptions = {
        'Traditional Collection': 'Explore our traditional designs',
        'Modern Designs': 'Contemporary fashion trends',
        'Bridal Collection': 'Exclusive bridal wear',
        'Festival Special': 'Celebration wear'
    };
    return descriptions[collection] || '';
}

// Function to load more gallery items
async function loadMoreItems() {
    const collections = ['Traditional Collection', 'Modern Designs', 'Bridal Collection', 'Festival Special'];
    const galleryGrid = document.querySelector('.gallery-page-grid');
    const currentItems = galleryGrid.children.length;
    
    // Add 12 new items (3 from each collection)
    for (let i = 0; i < 3; i++) {
        collections.forEach(collection => {
            const newItem = createGalleryItem(collection, i + 1);
            galleryGrid.appendChild(newItem);
        });
    }
    
    // Load images for new items
    const newImages = galleryGrid.querySelectorAll('img:not([src])');
    await loadImagesForElements(newImages, currentItems + 1);
}

// Function to load images for specific elements
async function loadImagesForElements(elements, startIndex) {
    const promises = [];
    
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
    let startIndex = Math.floor(Math.random() * 10) + 1;
    await loadImagesForElements(images, startIndex);
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
