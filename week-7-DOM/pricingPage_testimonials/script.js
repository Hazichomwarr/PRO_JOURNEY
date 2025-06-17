const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

function showSlide(index) {
  testimonials.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active-dot');
  });

  testimonials[index].classList.add('active');
  dots[index].classList.add('active-dot');
  currentIndex = index;
}

nextBtn.addEventListener('click', () => {
  const next = (currentIndex + 1) % testimonials.length;
  showSlide(next);
  resetAutoplay();
});

prevBtn.addEventListener('click', () => {
  const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showSlide(prev);
  resetAutoplay();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    showSlide(index);
    resetAutoplay();
  });
});

// === AUTOPLAY FUNCTIONALITY ===
let autoplayInterval = setInterval(() => {
  const next = (currentIndex + 1) % testimonials.length;
  showSlide(next);
}, 5000); // every 5 seconds

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => {
    const next = (currentIndex + 1) % testimonials.length;
    showSlide(next);
  }, 5000);
}


// Pause on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
carousel.addEventListener('mouseleave', resetAutoplay);

// Toggle monthly / yearly price
const toggleBtn = document.getElementById('billing-toggle');
const prices = document.querySelectorAll('.price');

const toggleBillingPrices = (toggleInput) => {
  for (let price of prices) {
    const yearlyPrice = price.getAttribute('data-yearly');
    const monthlyPrice = price.getAttribute('data-monthly');

    price.classList.add('fade');

     // After fade-out transition ends, swap text, then fade back in
    setTimeout(() => {
        price.textContent = toggleInput.checked
            ? `$${yearlyPrice}/y`
            : `$${monthlyPrice}/mo`;

        price.classList.remove('fade');
    }, 500) // Match the CSS transition duration of 0.5s
  }
};

toggleBtn.addEventListener('change', () => toggleBillingPrices(toggleBtn));

// === SWIPE FUNCTIONALITY FOR MOBILE ===
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) < 50) return; // Ignore tiny swipes

  if (swipeDistance > 0) {
    // Swipe Right = Previous
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showSlide(prev);
  } else {
    // Swipe Left = Next
    const next = (currentIndex + 1) % testimonials.length;
    showSlide(next);
  }
  resetAutoplay();
}