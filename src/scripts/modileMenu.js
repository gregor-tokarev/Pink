const toggleButton = document.querySelector('.header__toggle-button');
const toggleItem = document.querySelector('.header');

toggleItem.classList.toggle('header--close');
toggleButton.classList.toggle('header__toggle-button--close');

toggleButton.addEventListener('click', event => {
    console.log('click');
    toggleItem.classList.toggle('header--close');
    toggleButton.classList.toggle('header__toggle-button--close');
});
