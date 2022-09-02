/**
 * Удаляємо preloader коли сайт загрузився
 */
$(function(){
    $('#preloader').delay(350).fadeOut("slow", function() {
        $('#preloader').remove();
    });
});





/**
 * Lazyload
 */
$("img.lazyload").lazyload({
    threshold: 0.25
});





/**
 * Video background
 */
var videoList = $('.video-background');
if (videoList.length >= 1) {
    $.each(videoList, function(index, val) {
        $(val).youtubeBackground({
            videoId: $(val).data('video-id'),
        });

        var bgColor = $(val).data('bg-color');
        var bgImg   = $(val).data('bg-img');

        if (bgColor.length >= 1) {
            $(val).css('background-color', bgColor);
        }

        if (bgImg.length >= 1) {
            $(val).css('background-image', 'url('+bgImg+')');
        }

    });
}






/**
 * Стилізуємо Scroll
 */
$(".style-scroll").mCustomScrollbar({
    theme: "dark",
    axis: "x",
    alwaysShowScrollbar: 2,
    scrollInertia: 650,
});
$(".set-max-height").mCustomScrollbar({
    theme: "light",
    axis: "y",
    scrollInertia: 500
});







/**
 * Робить блоки слайдами
 */
var slider = $('.main'),
    sliderWidthDisable = 1200;

slider.slidescroll({
    pagesSelector: 'section',
    activeClassName: 'active',
    moved: null,
    beforemove: null,
    animationDuration: 1000,
    namespace: 'slidescroll'
});

var sliderInstance = slider.data('slidescroll');

if ($(window).width() < sliderWidthDisable) {
    sliderInstance.disable();
    $(".set-max-height").mCustomScrollbar("destroy");
    $(".style-scroll").mCustomScrollbar("destroy");
} else {
    sliderInstance.enable();
    $(".set-max-height").mCustomScrollbar({
        theme: "light",
        axis: "y",
        scrollInertia: 500
    });
    $(".style-scroll").mCustomScrollbar({
        theme: "dark",
        axis: "x",
        alwaysShowScrollbar: 2,
        scrollInertia: 650,
    });
}

$( window ).resize(function() {
    if ($(window).width() < sliderWidthDisable) {
        sliderInstance.disable();
        $(".style-scroll").mCustomScrollbar("destroy");
        $(".set-max-height").mCustomScrollbar("destroy");
    } else {
        sliderInstance.enable();
        $(".set-max-height").mCustomScrollbar({
            theme: "light",
            axis: "y",
            scrollInertia: 500
        });
        $(".style-scroll").mCustomScrollbar({
            theme: "dark",
            axis: "x",
            alwaysShowScrollbar: 2,
            scrollInertia: 650,
        });
    }
});



/**
 * Викликаємо бокову навігацію
 */
var slideRevealOptions = {
    trigger: $("#trigger-navbar"),
    position: 'right',
    autoEscape: false,
    width: 340,
    speed: 450,
    shown: function(slider, trigger){
        $('body').addClass('trigger-navbar--open');
    },
    hidden: function(slider, trigger){
        $('body').removeClass('trigger-navbar--open');
    },
    show: function(slider, trigger){
        $('body').prepend('<div class="trigger-nav--toggle" id="trigger-nav--toggle-overlay"></div>');
        $('#hamburger-toggle').addClass('hamburger-active');
    },
    hide: function(slider, trigger){
        $('.hamburger-active').removeClass('hamburger-active');
        $(document).find('#trigger-nav--toggle-overlay').remove();
    }
}
var slideReveal = $('#side-navbar').slideReveal(slideRevealOptions);

// Робимо додакткові кнопки щоб закрити або відкрити.
// Якщо буде відкрите тоді закриє, якщо буде закрите тоді викличе.
$(document).on('click', '.trigger-nav--toggle', function(event) {
    event.preventDefault();
    slideReveal.slideReveal("toggle")
});



/**
 * Для бокової частини, треба передавати висоту document
 * Через css rotate відображається некоректно 
 */
$(window).resize(function(event) {
    $('#sidebar-contacts--content').css({'width': $(window).height()});
});
$('#sidebar-contacts--content').css({'width': $(window).height()});




/**
 * Галерея
 */
$(".lightgallery").lightGallery({
    download: false,
    selector: '.item',
    mode: 'lg-fade',
});


var slickInit = $('#slick-slider').slick({
    adaptiveHeight: true,
    infinite: true,
    draggable: false,
    // nextArrow: true,
    speed: 1200,
    fade: true,
    cssEase: 'linear',
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    ]
});

$(document).on('click', '.slick-slider-next', function(event) {
    event.preventDefault();
    slickInit.slick("slickNext");
});
$(document).on('click', '.slick-slider-prev', function(event) {
    event.preventDefault();
    slickInit.slick("slickPrev");
});



// // On before slide change
// $('#slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    
//     $(this).find('.current-slide-num').html(currentSlide + 1);

//     var numWidthNull = 0;

//     if (currentSlide <= 9) {
//         numWidthNull = '0' + (currentSlide + 1);
//     } else {
//         numWidthNull = (currentSlide + 1);
//     }
//     $(this).find('.current-slide-num-01').html(numWidthNull);

//     var summWidthNull = 0,
//         summ = slick.slideCount;

//     if (summ <= 9) {
//         summWidthNull = '0' + summ;
//     } else {
//         summWidthNull = summ;
//     }
//     $(this).find('.total-slide-num').html(summWidthNull);
// });




$('.slick-slider-center').slick({
    infinite: true,
    draggable: true,
    // nextArrow: true,
    speed: 600,
    cssEase: 'linear',
    centerMode: true,
    initialSlide: 1,
    dots: true,
    slidesToShow: 2,
    responsive: [
        {
          breakpoint: 1250,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 565,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
    ]
});






/**
 * Універсальний скріпт зміни при кліку
 */
$(document).on('click', '[data-spell]', function(event) {

    // Відбираємо атрибут data-spell
    var data = $(this).data('spell'),
        splitData = data.split('<>'), // Формуємо масив з цього параметру
        secondLevelSplit;             // Заготовка для майбутніх данних


    // Проходимося по цьому масиві через цикл
    $.each(splitData, function(index, val) {

      // Формуємо масив в нашу заготовлену змінну
      secondLevelSplit = val.split('|');

        // Виводимо відносно типу
        switch(secondLevelSplit[1]) {
        case 'html':
            // Має бути 3-ри параметри .class#id|type|data
            $(secondLevelSplit[0]).html(secondLevelSplit[2]);
            break;
        case 'toggleClass':
            // Має бути 3-ри параметри .class#id|type|data
            $(secondLevelSplit[0]).toggleClass(secondLevelSplit[2]);
            break;
        case 'addClass':
            // Має бути 3-ри параметри .class#id|type|data
            $(secondLevelSplit[0]).addClass(secondLevelSplit[2]);
            break;
        case 'removeClass':
            // Має бути 3-ри параметри .class#id|type|data
            $(secondLevelSplit[0]).removeClass(secondLevelSplit[2]);
            break;
        case 'attr':
            // Має бути 4-ри параметри .class#id|type|type-toggle|data
            $(secondLevelSplit[0]).attr(secondLevelSplit[2], secondLevelSplit[3]);
            break;
        case 'data':
            // Має бути 4-ри параметри .class#id|type|type-toggle|data
            $(secondLevelSplit[0]).data(secondLevelSplit[2], secondLevelSplit[3]);
            break;
        case 'doFunction':
            // Має бути 2-ва параметри functionName|type
            // eval(secondLevelSplit[0]);
            window[secondLevelSplit[0]]();
            break;
        }

    });
});





/**
 * Textarea autogrow
 */
$('textarea.autogrow').autogrow()