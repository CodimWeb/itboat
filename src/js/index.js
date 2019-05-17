import $ from 'jquery';
import '../scss/style.scss';
import '../js/slick.min.js';
import '../js/ion.rangeSlider.min.js';

$(document).ready(function(){
    var slider = $('.slick-slider');
    var currentSlideGlobal = 1;
    slider.slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '',
        nextArrow: '',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });

    var stepToSlide = 4;
    var slideIsActive = stepToSlide;
    var sliderLength = $('.slider-item').length;

    if(window.innerWidth <= 991) {
        stepToSlide = 3;
        slideIsActive = stepToSlide;
    }

    if(window.innerWidth <= 599) {
        stepToSlide = 2;
        slideIsActive = stepToSlide;
    }

    if(window.innerWidth <= 399) {
        stepToSlide = 1;
        slideIsActive = stepToSlide;
    }

    $(window).resize(function(){
        if(window.innerWidth >= 992) {
            stepToSlide = 4;
            slideIsActive = stepToSlide;
            var currentSlide = slider.slick('slickCurrentSlide');
            console.log(currentSlide);
            var range2 = range.data("ionRangeSlider");
            range2.update({
                max: sliderLength - (stepToSlide - 1)
            });
            range.data("ionRangeSlider").update({from: currentSlide + 1});
        }

        if(window.innerWidth <= 991) {
            stepToSlide = 3;
            slideIsActive = stepToSlide;
            var currentSlide = slider.slick('slickCurrentSlide');
            var range2 = range.data("ionRangeSlider");
            range2.update({
                max: sliderLength - (stepToSlide - 1)
            });
            range.data("ionRangeSlider").update({from: currentSlide + 1});
            console.log(currentSlide);
        }
    
    });


    //сдвиг по нажатию на кнопки вперед/назад
    $('.slider-next').on('click', function(){
        var currSlide = slider.slick('slickCurrentSlide');
        if((currSlide + slideIsActive + stepToSlide) < sliderLength) {
            slider.slick('slickGoTo', currSlide + stepToSlide);
        } else {
            slider.slick('slickGoTo', sliderLength - stepToSlide);
        }
    });

    $('.slider-prev').on('click', function(){
        var currSlide = slider.slick('slickCurrentSlide');
        slider.slick('slickGoTo', currSlide - stepToSlide);
    });

    
    //инициализация ползунка
    var range = $(".js-range-slider");
    range.ionRangeSlider({
        type: 'single',
        min: 1,
        max: sliderLength - (stepToSlide - 1),
        step: 1,
        onChange: function (data) {
            slider.slick('slickGoTo', data.from - 1);
        }
    });

    //обновляем ползунок при слайде
    slider.on("afterChange", function (event, slick, currentSlide) {
        range.data("ionRangeSlider").update({from: currentSlide + 1});
    });

});
