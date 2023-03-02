let swiper = new Swiper('.hero-swiper', {
  loop: true,
  pagination: {
    el: '.hero-pagination',
    type: 'bullets',
    clickable: true,
  },
});

let stepBtn = document.querySelectorAll('.how-steps-step');
let howCards = document.querySelectorAll('.how-cards');
stepBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    stepBtn.forEach(function(btn){btn.classList.remove('how-steps-step-active')});
    e.currentTarget.classList.add('how-steps-step-active');

    howCards.forEach(function(element){element.classList.remove('how-cards-active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('how-cards-active');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  let acc = new Accordion('.accordion__list', {
  duration: 700,
  elementClass: 'accordion__item',
  triggerClass: 'accordion__top',
  panelClass: 'accordion__bottom',
  showMultiple: false,

    collapse: true
});
})

document.querySelector(".burger").addEventListener("click", function() {
  document.querySelector(".header-list").classList.add("active");
})
document.querySelector(".list-close-btn").addEventListener("click", function() {
  document.querySelector(".header-list").classList.remove("active");
})

document.querySelector(".header-search").addEventListener("click", function() {
  document.querySelector(".header-search-place").classList.add("active");
})
document.querySelector(".search-place-close").addEventListener("click", function() {
  document.querySelector(".header-search-place").classList.remove("active");
})

