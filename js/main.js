document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var navHeight = document.querySelector('nav').offsetHeight;
    document.querySelector('main').style.paddingTop = navHeight + 'px';
});