import { initMenu } from './modules/main-nav';
import Swiper, {Autoplay, EffectCoverflow, EffectFade, Navigation, Pagination} from 'swiper';
import './modules/attention';
import '../components/accordion/js/index';


document.addEventListener('DOMContentLoaded', () => {
  initMenu();

  const promoSlider = new Swiper('.promo__slider', {
    modules: [ Pagination, Autoplay, EffectFade],
    autoplay: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    slidesPerView: 1,
  });

  const centeredSlider = new Swiper('.waterfall-slider .swiper', {
    modules: [ Navigation, EffectCoverflow],
    loop: false,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    grabCursor: true,
    centeredSlides: true,
    effect: 'coverflow',
    breakpoints: {
      320: {
        slidesPerView: 2.5,
        coverflowEffect: {
          rotate: 0,
          scale: 0.8,
          slideShadows: false,
        },
      },
      940: {
        slidesPerView: 4.4,
        coverflowEffect: {
          rotate: 0,
          scale: 0.8,
          slideShadows: false,
        },
      }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
  });
})
