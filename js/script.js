const menu = document.querySelector('.menu');
const menuSection = menu.querySelector('.menu-section');
const menuArrow = menu.querySelector('.menu-mobile-arrow');
const menuClosed = menu.querySelector('.menu-mobile-close');
const menuTrigger = document.querySelector('.menu-mobile-trigger');
const menuOverlay = document.querySelector('.overlay');
let subMenu;

menuSection.addEventListener('click', (e) => {
    if (! menu.classList.contains('active')) {
        return;
    }
    if (e.target.closest('.menu-item-has-children')) {
        const hasChildren = e.target.closest('.menu-item-has-children');
        showSubMenu(hasChildren);
    }
});

menuArrow.addEventListener('click', () => {
    hideSubMenu();
});

menuTrigger.addEventListener('click', () => {
    toggleMenu();
});

menuClosed.addEventListener('click', () => {
    toggleMenu();
});

menuOverlay.addEventListener('click', () => {
    toggleMenu();
});

// Show & Hide Toggle Menu Function
function toggleMenu() {
    menu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

// Show the Mobile Side Menu Function
function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector('.menu-subs');
    subMenu.classList.add('active');
    subMenu.style.animation = 'slideLeft 0.5s ease forwards';
    const menuTitle = hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
    menu.querySelector('.menu-mobile-title').innerHTML = menuTitle;
    menu.querySelector('.menu-mobile-header').classList.add('active');
}

// Hide the Mobile Side Menu Function
function hideSubMenu() {
    subMenu.style.animation = 'slideRight 0.5s ease forwards';
    setTimeout(() => {
        subMenu.classList.remove('active');
    }, 300);

    menu.querySelector('.menu-mobile-title').innerHTML = '';
    menu.querySelector('.menu-mobile-header').classList.remove('active');
}

// Windows Screen Resizes Function
window.onresize = function () {
    if (this.innerWidth > 991) {
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
};


let sliderImages = document.querySelectorAll('.slide'),
    arrowLeft = document.querySelector('#arrow-left'),
    arrowRight = document.querySelector('#arrow-right'),
    current = 0;

// Clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = 'none';
    }
}

// Initial slider
function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
}

// show prev
function slideLeft() {
    reset()
    sliderImages[current - 1].style.display = 'block';
    current--;
}

// show next
function slideRight() {
    reset()
    sliderImages[current + 1].style.display = 'block';
    current++;
}

// left arrow click
arrowLeft.addEventListener('click', function () {
    if (current === 0) {
        current.sliderImages.length;
    }
    slideLeft();
});
// Right arrow click
arrowRight.addEventListener('click', function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});
startSlide();


$(document).ready(function () {
    $('.nav-carousel .owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        margin: 0,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true
            },
            575: {
                items: 2,
                dots: true
            },
            768: {
                items: 3,
                dots: true
            },
            992: {
                items: 4
            },
            1024: {
                items: 4
            },
            1024: {
                items: 4,
                loop: true
            },
            1200: {
                items: 5
            }
        }
    })

    $('.carousel-one .owl-carousel').owlCarousel({
        loop: true,
        dots: true,
        nav: false,
        margin: 10,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                dots: true,
                items: 1,
                nav: false
            },
            425: {
                dots: true,
                items: 1,
                nav: false
            },
            575: {
                dots: true,
                items: 2,
                nav: false
            },
            768: {
                dots: true,
                items: 3,
                nav: false
            },
            992: {
                items: 3,
                loop: true
            },
            1024: {
                items: 4,
                loop: true
            },
            1199: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });
    $('.carousel-two .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            425: {
                items: 1,
                nav: false
            },
            768: {
                items: 1,
                nav: true
            },
            1000: {
                items: 1,
                nav: true
            }
        }
    });

    $('.carousel-three .owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        margin: 20,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true,
                nav: false
            },
            425: {
                items: 1,
                dots: true,
                nav: false
            },
            768: {
                items: 2,
                dots: true,
                nav: false
            },
            992: {
                items: 3,
                loop: true
            },
            1440: {
                items: 3,
                margin: 10,
                loop: true
            }
        }
    });
    $('.carousel-four .owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        margin: 5,
        dots: true,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true,
                nav: false
            },
            575: {
                items: 2,
                dots: true,
                nav: false
            },
            768: {
                items: 3,
                dots: true,
                nav: false
            },
            992: {
                items: 4,
                loop: true
            },
            1024: {
                items: 4,
                loop: true
            },
            1024: {
                items: 4,
                loop: true
            },
            1200: {
                items: 5,
                loop: true
            }
        }
    });

});

