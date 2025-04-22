document.addEventListener('DOMContentLoaded', () => {
    // Get all slideshow containers
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    // Create a slideshow instance for each container
    slideshowContainers.forEach(container => {
        const slides = container.querySelector('.slides');
        const slideItems = container.querySelectorAll('.slide');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slideItems.length;
        
        // Function to update slide position
        function updateSlidePosition() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlidePosition();
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
        }
        
        // Event listeners for buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    });

    // FAQ Section Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // Scroll functionality for trend items
    const trendGrids = document.querySelectorAll('.trend-grid');
    
    trendGrids.forEach(grid => {
        const scrollLeftBtn = grid.parentElement.querySelector('.scroll-left');
        const scrollRightBtn = grid.parentElement.querySelector('.scroll-right');
        
        // Scroll left
        scrollLeftBtn.addEventListener('click', () => {
            const scrollAmount = grid.offsetWidth;
            grid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Scroll right
        scrollRightBtn.addEventListener('click', () => {
            const scrollAmount = grid.offsetWidth;
            grid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll buttons based on scroll position
        grid.addEventListener('scroll', () => {
            const isAtStart = grid.scrollLeft === 0;
            const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
            
            scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
            scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
            
            scrollLeftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            scrollRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
        
        // Initial check for scroll buttons
        grid.dispatchEvent(new Event('scroll'));
    });
    
});
// For open item page
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Button ka parent (trend-item) find karo
    const trendItem = button.closest('.trend-item');

    // Uske andar ka image aur h4 dhundo
    const image = trendItem.querySelector('img');
    const title = trendItem.querySelector('h4');

    // Console me print karo
    console.log("Image Source:", image.src);
    console.log("Product Name:", title.textContent);
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all Order Now buttons
    const orderButtons = document.querySelectorAll('.buy-btn');
    
    // Add click event listener to each button
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the product details from the parent trend-item
            const trendItem = this.closest('.trend-item');
            const productTitle = trendItem.querySelector('h4').textContent;
            const productPrice = trendItem.querySelector('p').textContent;
            const productImage = trendItem.querySelector('img').src;
            
            // Generate a unique ID for the product
            const productId = trendItem.querySelector('img').id;
            
            // Redirect to PDP with product details as URL parameters
            window.location.href = `pdp.html?id=${productId}&title=${encodeURIComponent(productTitle)}&price=${encodeURIComponent(productPrice)}&image=${encodeURIComponent(productImage)}`;
        });
    });

    // Make all product images clickable
    const productImages = document.querySelectorAll('.trend-item img, .gallery-item img');
    productImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const trendItem = this.closest('.trend-item');
            if (trendItem) {
                // If it's a trend item
                const productTitle = trendItem.querySelector('h4').textContent;
                const productPrice = trendItem.querySelector('p').textContent;
                const productImage = this.src;
                const productId = this.id;
                
                window.location.href = `pdp.html?id=${productId}&title=${encodeURIComponent(productTitle)}&price=${encodeURIComponent(productPrice)}&image=${encodeURIComponent(productImage)}`;
            } else {
                // If it's a gallery item
                const galleryItem = this.closest('.gallery-item');
                const productTitle = galleryItem.querySelector('h3').textContent;
                const productImage = this.src;
                const productId = this.id;
                
                window.location.href = `pdp.html?id=${productId}&title=${encodeURIComponent(productTitle)}&price=${encodeURIComponent('Contact for Price')}&image=${encodeURIComponent(productImage)}`;
            }
        });
    });
});


// Sabhi nav links ko select karo
const navLinks = document.querySelectorAll('nav a');

// Har ek link par click hone par active class add ya remove karo
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Pehle sabhi links se active class hata do
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Clicked link ko active bana do
        link.classList.add('active');
    });
});
