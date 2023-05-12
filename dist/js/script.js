/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  function slider() {
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
      const wrapper = document.querySelector('.slider__wrapper'),
        widthContainer = +window.getComputedStyle(container).maxWidth.slice(0, -2),
        distance = +window.getComputedStyle(slides[0]).marginRight.slice(0, -2),
        itemWidth = slides[0].offsetWidth + distance;
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
        if (indexSlide > totalVisibleSlides) {
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
    function clickBtn(btn) {
      let num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      btn.addEventListener('click', () => {
        changeSlides(num);
        changeNavigation(num);
        adaptiveSlider();
      });
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

/***/ })

/******/ });
//# sourceMappingURL=script.js.map