const page = document.querySelector('.page');
const btnSwitchTheme = document.querySelectorAll('.contrast-version');

let theme = 'light';

const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark') {
  page.classList.add('page--dark');
} else {
  page.classList.add('page--light');
}

if (page.classList.contains('page--light')) {
  theme = 'light';
  page.classList.remove('page--dark');
}

if (btnSwitchTheme) {
  btnSwitchTheme.forEach((element) => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      page.classList.toggle('page--dark');

      if (page.classList.contains('page--dark')) {
        theme = 'dark';
      } else {
        page.classList.remove('page--dark');
        theme = 'light';
      }
      localStorage.setItem('theme', theme);
    });
  });
}
