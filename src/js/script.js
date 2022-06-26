
// const slider = tns({
//   container: '.carousel__inner',
//   items: 1,
//   slideBy: 'page',
//   controls: false,
//   nav: false,
//   navPosition: "bottom",
//   responsive: {
//     320: {
//       nav: true
//     },
//     992: {
//       nav: false
//     }
//   }
// });
// document.querySelector('.next').addEventListener('click', function () {
//   slider.goTo('next');
// });
// document.querySelector('.prev').addEventListener('click', function () {
//   slider.goTo('prev');
// });
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop:true,
    nav:true,
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    nav: false,
    center: true,
    responsive:{
        0:{
          dots: true,
          items: 1,
          mouseDrag: true,
          touchDrag: true,
        },
        992:{
          mouseDrag: true,
          dots: false,
          items: 1
        }
    }
})
const owl = $('.owl-carousel');
owl.owlCarousel();
$('.next').click(function() {
  owl.trigger('next.owl.carousel');
})
$('.prev').click(function() {
  owl.trigger('prev.owl.carousel');
})
});

