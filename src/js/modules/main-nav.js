import { ScrollLock } from '../../components/scroll-lock/js/scroll-lock';

const initMenu = () => {
  const menuButton = document.querySelector('.main-nav__toggle');
  const menuList = document.querySelector('.main-nav__wrapper');
  const body = document.querySelector('body');

  menuButton.addEventListener('click', () => {
    let expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
    menuButton.classList.toggle('main-nav__toggle--open');
    menuList.classList.toggle('main-nav__wrapper--active');
    if (menuList.classList.contains('main-nav__wrapper--active')) {
      window.scrollLock.disableScrolling();
    } else {
      window.scrollLock.enableScrolling();
    }
  });
};

export { initMenu };
