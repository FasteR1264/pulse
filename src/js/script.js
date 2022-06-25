$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: false,
      prevArrow:'<button type="button" class="slick-prev"><img src="img/carousel/chevron-left.png" alt="chevron_left"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right.png" alt="chevron_right"></button>',
      responsive: [
        {
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }
      ]
    });
  });