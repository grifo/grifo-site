// Navigation
(() => {
    const body = document.body;
    const header = document.getElementById('header');
    const navigationMenu = document.getElementById('navigation-menu');
    const toggleMenu = document.getElementById('toggle-menu');
    const sectionHome = document.getElementById('section-home');
    const scrolledClass = '-scrolled';
    const activeClass = '-active';
    const scrolled = () => body.scrollTop > sectionHome.offsetHeight - header.offsetHeight;

    window.addEventListener('scroll', () => header.classList.toggle(scrolledClass, scrolled()));
    toggleMenu.addEventListener('click', () => navigationMenu.classList.toggle(activeClass));
})();
