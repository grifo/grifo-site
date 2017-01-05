import scrollTo from 'scroll-to';

// Navigation
(() => {
    const body = document.body;
    const header = document.getElementById('header');
    const navigationMenu = document.getElementById('navigation-menu');
    const toggleMenu = document.getElementById('toggle-menu');
    const sectionHome = document.getElementById('home');
    const linksNav = document.querySelectorAll('.link-nav');
    const sectionsNav = document.querySelectorAll('.section-nav');
    const scrolledClass = '-scrolled';
    const activeClass = '-active';
    let positions = [];

    const scrolled = () => body.scrollTop > sectionHome.offsetHeight - header.offsetHeight - 30;

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

        positions.forEach((position) => {
            const scrollWithOffset = body.scrollTop + header.offsetHeight;
            if (scrollWithOffset >= position.top && scrollWithOffset < position.bottom) {
                selectNavItem(position.name);
            }
            return false;
        });
    };

    const updatePositions = () => {
        positions = [].map.call(sectionsNav, section => ({
            name: section.getAttribute('id'),
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight,
        }));
    };
    updatePositions();

    const clickLinkNav = (e) => {
        const link = e.target;
        const sectionName = link.getAttribute('href').replace(/.*#/, '');
        const section = document.getElementById(sectionName);

        scrollTo(0, section.offsetTop - header.offsetHeight, {
            ease: 'outQuad',
            duration: 1000,
        });
    };

    toggleMenu.addEventListener('click', updateNavigationMenuStatus);
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updatePositions);

    linksNav.forEach((link) => {
        link.addEventListener('click', clickLinkNav);
    });
})();
