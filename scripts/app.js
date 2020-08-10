document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navbar = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const nav = document.querySelector('.navbar');
    const navLinksTxt = document.querySelectorAll('.nav-link');
    const wrapper = document.querySelector('.wrapper');
    const bars = document.querySelectorAll('.burger div');

    burger.addEventListener('click', () => {
        //toggle the navigation by clicking on burger button
        navbar.classList.toggle('navbar-active');
        wrapper.classList.toggle('no-overflow');
        nav.classList.toggle('no-overflow');
        navbar.classList.toggle('no-overflow');

        
        //change some coloring
        navbar.classList.toggle('darken-background');
        bars.forEach(bar => bar.classList.toggle('bar-darken-background'));
       
        // nav.classList.toggle('darken-background');
        navLinksTxt.forEach(link => {
            link.classList.toggle('darken-color');
        });

        //animate burger button
        burger.classList.toggle('toggle');

        //animate individual nav links
        navLinks.forEach((link, index) => {
            if (link.style.animation)
                link.style.animation = '';
            else 
                link.style.animation = `navbarSlide 0.5s ease-in-out forwards ${index / 7 + .3}s`;
        });
    });
});
