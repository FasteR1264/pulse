
const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  controls: false,
  nav: false,
  navPosition: "bottom",
  responsive: {
    320: {
      nav: true
    },
    992: {
      nav: false
    }
  }
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});