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
    const scrolled = () => scrollTop() > sectionHome.offsetHeight - header.offsetHeight - 80;

    const toggleClass = (el, className, force = undefined) => {
        if (force === true) {
            return el.classList.add(className);
        } else if (force === false) {
            return el.classList.remove(className);
        }

        if (el.classList.contains(className)) {
            return el.classList.remove(className);
        }
        return el.classList.add(className);
    };

    const updateNavigationMenuStatus = (force = undefined) => {
        toggleClass(navigationMenu, activeClass, force);
    };

    const selectNavItem = (positionName) => {
        [].forEach.call(linksNav, (link) => {
            if (link.getAttribute('href').replace(/.*#/, '') === positionName) {
                link.classList.add(activeClass);
            } else {
                link.classList.remove(activeClass);
            }
        });
    };

    const updateScroll = () => {
        toggleClass(header, scrolledClass, scrolled());
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
        const top = scrollTop();
        positions.forEach((position) => {
            const scrollWithOffset = top + header.offsetHeight + (window.innerHeight / 3);

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
        updateNavigationMenuStatus(false);

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

    [].forEach.call(linksNav, (link) => {
        link.addEventListener('click', clickLinkNav);
    });
})();
