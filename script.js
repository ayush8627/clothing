document.addEventListener('DOMContentLoaded', () => {
    alert("Sorry I don't have time to properly name all the items.")
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
