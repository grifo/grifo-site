import scrollTo from 'scroll-to';
import _ from 'underscore';

// Navigation
(() => {
    const header = document.getElementById('header');
    const navigationMenu = document.getElementById('navigation-menu');
    const toggleMenu = document.getElementById('toggle-menu');
    const sectionHome = document.getElementById('home');
    const linksNav = document.querySelectorAll('.link-nav');
    const sectionsNav = document.querySelectorAll('.section-page');
    const scrolledClass = '-scrolled';
    const activeClass = '-active';
    let positions = [];

    const scrollTop = () =>
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrolled = () => scrollTop() > sectionHome.offsetHeight - header.offsetHeight - 30;

    const updateNavigationMenuStatus = () => {
        navigationMenu.classList.toggle(activeClass);
    };

    const selectNavItem = (positionName) => {
        linksNav.forEach((link) => {
            if (link.getAttribute('href').replace(/.*#/, '') === positionName) {
                link.classList.add(activeClass);
            } else {
                link.classList.remove(activeClass);
            }
        });
    };

    const updateScroll = () => {
        header.classList.toggle(scrolledClass, scrolled());
    };

    const updatePositions = () => {
        positions = [].map.call(sectionsNav, section => ({
            name: section.getAttribute('id'),
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight,
        }));
    };
    updatePositions();

    const updateNav = () => {
        positions.forEach((position) => {
            const scrollWithOffset = scrollTop() + header.offsetHeight;
            if (scrollWithOffset >= position.top && scrollWithOffset < position.bottom) {
                document.getElementById(position.name).classList.add(activeClass);
                selectNavItem(position.name);
                history.pushState(null, null, `#${position.name}`);
            }
            return false;
        });
    };
    updateNav();

    const navigateTo = (sectionName) => {
        const section = document.getElementById(sectionName);

        scrollTo(0, section.offsetTop - header.offsetHeight, {
            ease: 'outQuad',
            duration: 1000,
        });
    };

    const clickLinkNav = (e) => {
        const link = e.target;
        const sectionName = link.getAttribute('href').replace(/.*#/, '');
        navigateTo(sectionName);
    };

    const firstLoad = () => {
        const href = window.location.href;

        if (href.indexOf('#') > -1) {
            navigateTo(href.replace(/.*#/, ''));
        }
    };
    setTimeout(firstLoad, 200);

    toggleMenu.addEventListener('click', updateNavigationMenuStatus);
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('scroll', _.debounce(updateNav, 100));
    window.addEventListener('resize', _.debounce(updatePositions, 100));

    linksNav.forEach((link) => {
        link.addEventListener('click', clickLinkNav);
    });
})();
