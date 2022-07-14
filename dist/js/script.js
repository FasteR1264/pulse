$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        nav: false,
        center: true,
        responsive: {
            0: {
                dots: true,
                items: 1,
                mouseDrag: true,
                touchDrag: true,
            },
            992: {
                mouseDrag: true,
                dots: false,
                items: 1,
            },
        },
    });
    const owl = $('.owl-carousel');
    owl.owlCarousel();
    $('.next').click(function () {
        owl.trigger('next.owl.carousel');
    });
    $('.prev').click(function () {
        owl.trigger('prev.owl.carousel');
    });

    $('ul.catalog__tabs').on(
        'click',
        'li:not(.catalog__tab_active)',
        function () {
            $(this)
                .addClass('catalog__tab_active')
                .siblings()
                .removeClass('catalog__tab_active')
                .closest('div.container')
                .find('div.catalog__content')
                .removeClass('catalog__content_active')
                .eq($(this).index())
                .addClass('catalog__content_active');
        }
    );

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault(); //Предотвращает от перехода по ссылке
                $('.catalog-item__content')
                    .eq(i)
                    .toggleClass('catalog-item__content_active'); //toggleClass либо добавляет либо убирает активный класс
                $('.catalog-item__list')
                    .eq(i)
                    .toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal windows
    //$ получение доступа к элементам на странице. fadeOut() - анимация в Jquery, прячет элемент
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text(
                $('.catalog-item__subtitle').eq(i).text()
            );
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Валидация форм
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: {
                    required: 'Пожалуйста, введите своё имя.',
                    minlength: jQuery.validator.format('Минимум {0} символа!'),
                },
                phone: 'Пожалуйста, введите свой номер телефона.',
                email: {
                    required: 'Пожалуйста, введите свою почту.',
                    email: 'Неправильно введён адрес почты.',
                },
            },
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //Маска ввода номера телефона
    $('input[name=phone]').mask('+7 (999) 999-99-99');

    // PHP mailer
    $('form').submit(function (e) {//Событие submit - отправка заполненной формы
        e.preventDefault(); //Отключает стандартное поведение браузера - перезагрузка при отправке формы.
        $.ajax({//Метод для отправки формы
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize(), //Подготовка информации из формы для отправки на сервер в нужном формате
        }).done(function () {//После выполнения прерыдущей операции, выполнить следующее
            $(this).find('input').val(''); //Очистка всех инпутов после отправки
            $('#consultation, #order').fadeOut();
            $('form').trigger('reset'); //Очистить все формы
            $('.overlay, #thanks').fadeIn('slow');
        });
        return false;
    });
    // Smoth scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1900) {
            $('.pageup').fadeIn()
        } else {
            $('.pageup').fadeOut()
        }
    });

    $("a[href='#up']").click(function(){// ^ означает начинаться, т.е. название ссылки начинается с #
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    
    new WOW().init();
});
