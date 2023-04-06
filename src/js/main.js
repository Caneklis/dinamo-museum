import { initMenu } from './modules/main-nav';
import Swiper, {Autoplay, EffectCoverflow, EffectFade, Navigation, Pagination} from 'swiper';
import './modules/attention';
import '../components/accordion/js/index';
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import{ readMoreLess } from './modules/read-more'

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
        initialSlide: 2,
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

  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,
    dragToClose: false,
    contentClick: false,
    Images: {
      zoom: true,
    },
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ['close'],
      },
    },
    Carousel: {
      Navigation: false,
    },
  });

  readMoreLess();

  const alc_date = new Date();
  alc_date.setDate(alc_date.getDate() + 1);
  document.cookie = "alertcookie=1;path=/;expires=" + alc_date.toGMTString();
})
