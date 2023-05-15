import { initMenu } from './modules/main-nav';
import Swiper, {Autoplay, EffectCoverflow, EffectFade, Navigation, Pagination} from 'swiper';
import './modules/attention';
import '../components/accordion/js/index';
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import{ readMoreLess } from './modules/read-more';
import Plyr from 'plyr';
import './modules/contrast-switcher';
import '../components/cookies/js/index';

// import bvi from 'bvi';
// import './modules/form'

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

  const centeredSlider = new Swiper('.textpage__slider .waterfall-slider .swiper', {
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
        initialSlide: 2,
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

  const newsSlider = new Swiper('.news__slider .waterfall-slider .swiper', {
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
        initialSlide: 0,
        coverflowEffect: {
          rotate: 0,
          scale: 0.8,
          slideShadows: false,
        },
      },
      940: {
        slidesPerView: 4.4,
        initialSlide: 0,
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
    Thumbs: {
      type: "classic",
    },
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
      Navigation: true,
    },
  });

  readMoreLess();

  const alc_date = new Date();
  alc_date.setDate(alc_date.getDate() + 1);
  document.cookie = "alertcookie=1;path=/;expires=" + alc_date.toGMTString();

  const radio = new Plyr(document.querySelector('.plyr'), {
    iconUrl: '/images/sprite_auto.svg',
    controls: ['play', 'progress', 'current-time', 'mute', 'volume']
  });


  const audioPlayer = document.querySelector('.playlist');

  if (audioPlayer) {
    const songs = audioPlayer.querySelectorAll('.playlist__list li');
    let i;
    let active = null;

    for(i = 0; i < songs.length; i++) {
      songs[i].onclick = changeChannel;
    }

    setSource( getId(songs[0]), buildSource(songs[0]) );

    document.querySelector('.plyr').addEventListener('ended', nextSong);

    function changeChannel(e) {
      setSource( getId(e.target), buildSource(e.target), true );
    }

    function getId(el) {
      return Number(el.getAttribute('data-id'));
    }

    function buildSource(el) {
      var obj = [{
        src: el.getAttribute('data-audio'),
        type: 'audio/mp3'
      }];

      return obj;
    }

    function setSource(selected, sourceAudio, play) {
      if(active !== selected) {
        active = selected;
        radio.source = {
          type: 'audio',
          title: 'test',
          sources: sourceAudio
        };

        for(var i = 0; i < songs.length; i++) {
          if(Number(songs[i].getAttribute('data-id')) === selected) {
            songs[i].className = 'playlist__item active';
          } else {
            songs[i].className = 'playlist__item';
          }
        }

        if(play) {
          radio.play();
        }
      } else {
        radio.togglePlay();
      }
    }

    function nextSong(e) {
      var next = active + 1;

      if(next < songs.length) {
        setSource( getId(songs[next]), buildSource(songs[next]), true );
      }
    }
  }

  // new isvek.Bvi({
  //   fontSize: 26,
  //   lineHeight: 'big',
  //   images: false,
  //   speech: false
  // });

})
