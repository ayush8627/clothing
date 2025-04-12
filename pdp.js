  // Get product details from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const productTitle = urlParams.get('title');
  const productPrice = urlParams.get('price');
  const productImage = urlParams.get('image');
  // back bar
  document.getElementById('back-bar-title').textContent = productTitle;
  // Update PDP content
  document.getElementById('pdp-title').textContent = productTitle;
  document.getElementById('pdp-price').textContent = productPrice;
  document.getElementById('pdp-image').src = productImage;

  // Size selection functionality
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
          sizeOptions.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
      });
  });

  // Quantity control functionality
  const quantityInput = document.querySelector('.quantity-input');
  const minusBtn = document.querySelector('.quantity-btn:first-child');
  const plusBtn = document.querySelector('.quantity-btn:last-child');

  minusBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
          quantityInput.value = value - 1;
      }
  });

  plusBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
  });

  // WhatsApp integration
  const buyNowBtn = document.getElementById('buyNowBtn');
  const whatsappMessage = document.getElementById('whatsappMessage');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');
  const confirmWhatsApp = document.getElementById('confirmWhatsApp');

  buyNowBtn.addEventListener('click', () => {
      whatsappMessage.classList.add('active');
      overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
      whatsappMessage.classList.remove('active');
      overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
      whatsappMessage.classList.remove('active');
      overlay.classList.remove('active');
  });

  confirmWhatsApp.addEventListener('click', () => {
      const selectedSize = document.querySelector('.size-option.selected')?.textContent || 'Not selected';
      const quantity = document.querySelector('.quantity-input').value;
      const productTitle = document.getElementById('pdp-title').textContent;
      const productPrice = document.getElementById('pdp-price').textContent;
      const productImage = document.getElementById('pdp-image').src;
      const message = `*Order Details:*%0A%0A*Product:* ${encodeURIComponent(productTitle)}%0A*Price:* ${encodeURIComponent(productPrice)}%0A*Size:* ${encodeURIComponent(selectedSize)}%0A*Quantity:* ${encodeURIComponent(quantity)}%0A%0A*Image:* ${encodeURIComponent(productImage)}%0A%0AI would like to purchase this item.`;
    //  const message = `*Order Details:*%0A%0A*Product:* ${productTitle}%0A*Price:* ${productPrice}%0A*Size:* ${selectedSize}%0A*Quantity:* ${quantity}%0A%0A*Image:* ${productImage}%0A%0AI would like to purchase this item.`;

      const whatsappUrl = `https://wa.me/919569374626?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      whatsappMessage.classList.remove('active');
      overlay.classList.remove('active');
  });

  // Tab functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          const tabId = tab.getAttribute('data-tab');
          
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          tab.classList.add('active');
          document.getElementById(tabId).classList.add('active');
      });
  });

  // Rating functionality
  const ratingStars = document.querySelectorAll('.rating-input i');
  ratingStars.forEach(star => {
      star.addEventListener('click', () => {
          const rating = star.getAttribute('data-rating');
          ratingStars.forEach(s => {
              if (s.getAttribute('data-rating') <= rating) {
                  s.classList.remove('far');
                  s.classList.add('fas');
              } else {
                  s.classList.remove('fas');
                  s.classList.add('far');
              }
          });
      });
  });

  // Review form submission
  const reviewForm = document.querySelector('.review-form');
  reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const reviewText = reviewForm.querySelector('textarea').value;
      const rating = document.querySelectorAll('.rating-input i.fas').length;
      
      if (rating === 0) {
          alert('Please select a rating');
          return;
      }
      
      if (!reviewText.trim()) {
          alert('Please write a review');
          return;
      }
      
      // Here you would typically send the review to your backend
      alert('Thank you for your review!');
      reviewForm.reset();
      ratingStars.forEach(star => {
          star.classList.remove('fas');
          star.classList.add('far');
      });
  });
