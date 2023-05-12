window.addEventListener('DOMContentLoaded', () => {
    function slider () {
        const container = document.querySelector('.container'),
              slides = document.querySelectorAll('.slider__item'),
              prev = document.querySelector('.slider__btn'),
              next = document.querySelector('.slider__btn-next'),
              navigation = document.querySelector('.slider__navigation'),
              activeDot = document.querySelector('.slider__dot'),
              widthNavigation = +window.getComputedStyle(navigation, 'after').width.slice(0, -2),
              widthActiveDot = widthNavigation / slides.length;
        let indexSlide = 0,
            positionActiveSlide = 0;

        //Устанавливаем ширину активного слайда в навигации
        activeDot.style.width = `${widthActiveDot}px`;
    
        changeSlides(indexSlide);

        //Меняем активный слайд
        function changeSlides(n) {
            indexSlide += n;

            if (indexSlide > slides.length - 1) {
                indexSlide = 0;
            }

            if (indexSlide < 0) {
                indexSlide = slides.length - 1;
            }

            slides.forEach(slide => slide.classList.remove('slider__item-active'));
            slides[indexSlide].classList.add('slider__item-active');
        }

        //Меняем положение активного слайда в навигации
        function changeNavigation(num) {

            positionActiveSlide += num;

            if (indexSlide === 0) {
                positionActiveSlide = 0; 
            }

            if (indexSlide === slides.length - 1) {
                positionActiveSlide = slides.length - 1;
            }

            activeDot.style.transform = `translateX(${positionActiveSlide * widthActiveDot}px)`;
        }

        // Адаптируем слайдер
        function adaptiveSlider() {
            const wrapper = document.querySelector('.slider__wrapper');
            const widthContainer = +window.getComputedStyle(container).maxWidth.slice(0, -2);
            const distance = +window.getComputedStyle(slides[0]).marginRight.slice(0, -2);
            const itemWidth = +window.getComputedStyle(slides[0]).width.slice(0, -2) + distance;

            let totalVisibleSlides;

            //Устанавливаем кол-во видимых слайдов в зависимости от ширины контейнера
            if (widthContainer === 720) {
                totalVisibleSlides = 3;
            } else if (widthContainer === 540) {
                totalVisibleSlides = 2;
            } else if (widthContainer < 540) {
                totalVisibleSlides = 1;
            }

            //Устанавливаем ширину для обёртки слайдов
            wrapper.style.width = 100 * slides.length + '%';

            //Смещаем слайды
            function slideShift(n) {
                if(indexSlide > totalVisibleSlides) {
                    wrapper.style.transform = `translateX(${n * (indexSlide - totalVisibleSlides + 1)}px)`;
                }
                if (indexSlide === totalVisibleSlides) {
                    wrapper.style.transform = `translateX(${n}px)`;
                }
                if (indexSlide === 0) {
                    wrapper.style.transform = `translateX(0px)`;
                }
            }

            return slideShift(-itemWidth);
        }

        //Вешаем обработчик события на кнопки
        function clickBtn(btn, num = 1) {
            btn.addEventListener('click', () => {
                changeSlides(num);
                changeNavigation(num);
                adaptiveSlider();
            })
        }

        clickBtn(prev, -1);
        clickBtn(next, 1);

        // Подключаем таймер
        const timer = setInterval(() => {
            changeSlides(1);
            changeNavigation(1);
            adaptiveSlider();
        }, 5000);
    }

    slider();
});