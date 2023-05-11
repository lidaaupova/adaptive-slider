window.addEventListener('DOMContentLoaded', () => {
    function slider () {
        const slider = document.querySelector('.slider'),
              container = document.querySelector('.slider__wrapper'),
              track = document.querySelector('.slider__track'),
              slides = document.querySelectorAll('.slider__item'),
              prev = document.querySelector('.slider__btn'),
              next = document.querySelector('.slider__btn-next'),
              navigation = document.querySelector('.slider__navigation'),
              activeSlide = document.querySelector('.slider__active'),
              totalVisibleSlides = 4,
              distance = +window.getComputedStyle(slides[0]).marginRight.slice(0, -2), //расстояние между элементами
              itemWidth = +window.getComputedStyle(slides[0]).width.slice(0, -2) + distance, //полная ширина элемента вместе с отступом
              widthNavigation = +window.getComputedStyle(navigation, 'after').width.slice(0, -2);
        let positionSlide = 0,
            positionActiveSlide = 0;

        //Устанавливаем ширину для обёртки слайдов
        track.style.width = 100 * slides.length + '%';

        //Устанавливаем ширину активного слайда в навигации
        activeSlide.style.width = `${widthNavigation / slides.length}px`;
    
        //Меняем положение слайдов
        function changeSlides(n) {
            positionSlide += n;

            if (positionSlide < -(itemWidth * (slides.length - totalVisibleSlides))) {
                positionSlide = 0;
            }

            if (positionSlide > 0) {
                positionSlide = -(itemWidth * (slides.length - totalVisibleSlides));
            }

            track.style.transform = `translateX(${positionSlide}px)`;
        }
    
        //Вешаем обработчик события на кнопки
        function clickBtn(btn, width) {
            btn.addEventListener('click', () => {
                changeSlides(width);
            })
        }

        clickBtn(prev, itemWidth);
        clickBtn(next, -itemWidth);

        //Меняем положение активного слайда в навигации
        function changeNavigation() {
            if (positionSlide === 0) {
                positionActiveSlide = 0;
            } else if (positionSlide < -(itemWidth * (slides.length - totalVisibleSlides))) {
                positionActiveSlide = (slides.length - 1) * widthNavigation;
            } else {
                
            }

            activeSlide.style.transform = `translateX(${positionActiveSlide}px)`;
        }

        changeNavigation();
    }

    slider();
});