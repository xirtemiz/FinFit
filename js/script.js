"use strict";
function init() {
    var $win = $(window),
        viewport_tablet = 768,
        $slides = $('#slides'),
    //Коэффициент между картинками для мобильников и не мобильников
        k = .6122449,
    //Финальное положение движущихся картинок
        slide3_final_pos = -134,
        slide2_final_pos = slide3_final_pos / 2,
    //Величина просвета поверх картинок - для видимого перемещения картинок (замеряна вручную)
        space_at_picture_default = 130,
        space_at_picture_mobile = 130 * k,
    //Коэффициенты скоростей
        slide2_speed = $slides.data('slide2Speed'),
        slide3_speed = $slides.data('slide3Speed');

    //Прокрутка страницы
    $win.on('scroll', function () {
        //Величина области просмотра
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        //Высота окна
            win_h = $win.height(),
        //Величина прокрутки
            scroll_pos = $win.scrollTop(),
        //Текущее положение картинки
            slides_pos = $slides.offset().top;

        function setCoordsMobileView() {
            //Вычисляемые значения для движения картинок
            var yPos2 = (slides_pos - scroll_pos - win_h + space_at_picture_mobile) / slide2_speed,
                yPos3 = (slides_pos - scroll_pos - win_h + space_at_picture_mobile) / slide3_speed,
                coords = '50% 0, 50% ' + yPos2 + 'px, 50% ' + yPos3 + 'px';

            if ((scroll_pos + win_h - space_at_picture_mobile) > slides_pos && (yPos2 >= slide2_final_pos * k || yPos3 >= slide3_final_pos * k)) {
                $slides.css({
                    backgroundPosition: coords
                });
            }
        }

        function setCoordsDesktopView() {
            var yPos2 = (slides_pos - scroll_pos - win_h + space_at_picture_default) / slide2_speed,
                yPos3 = (slides_pos - scroll_pos - win_h + space_at_picture_default) / slide3_speed,
                coords = '50% 0, 50% ' + yPos2 + 'px, 50% ' + yPos3 + 'px';

            if ((scroll_pos + win_h - space_at_picture_default) > slides_pos && (yPos2 >= slide2_final_pos || yPos3 >= slide3_final_pos)) {
                $slides.css({
                    backgroundPosition: coords
                });
            }
        }

        if (w < viewport_tablet) {
            setCoordsMobileView();
        } else {
            setCoordsDesktopView();
        }
    });
}

window.onload = function () {
    init();
};