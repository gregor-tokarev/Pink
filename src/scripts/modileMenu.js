const toggleButton = document.querySelector('.header__toggle-button');
const toggleItem = document.querySelector('.header');
const intro = document.querySelector('.intro');

toggleItem.classList.toggle('header--close');
toggleButton.classList.toggle('header__toggle-button--close');


intro.addEventListener('click', () => {}, true);
toggleButton.addEventListener('click', event => {
    console.log('click');
    toggleItem.classList.toggle('header--close');
    toggleButton.classList.toggle('header__toggle-button--close');
});
