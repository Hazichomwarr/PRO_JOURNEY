const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slides = document.querySelectorAll('.testimonial-slide')

let currentSlide = 0;
let interval = null;

function showSlide(index) {
  slides.forEach(t => t.classList.remove('active'));
  slides[index].classList.add('active');
}

const showNextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
};

const showPrevSlide = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
};

nextBtn.addEventListener("click", showNextSlide);
prevBtn.addEventListener("click", showPrevSlide);

// === AUTOPLAY FUNCTIONALITY ===
const startAutoplay = () => {
  interval = setInterval(showNextSlide, 5000); // every 5 seconds
};
const stopAutoplay = () => clearInterval(interval);

// Start on load
startAutoplay();

// Pause on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);