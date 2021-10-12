// ------------------header animation delay-------------------

const nav = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const offset = window.pageYOffset;
  
  if(offset > 75)
    nav.classList.add('scroll')
  else 
    nav.classList.remove('scroll')
});



// ----------------header----------------------------
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


// -------------- image slider ------------------------
+ function($) {
    'use strict';

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }
        return false 
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function() {
            called = true
        })
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function() {
        $.support.transition = transitionEnd()
        if (!$.support.transition) return
        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

+function($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused = null
        this.sliding = null
        this.interval = null
        this.$active = null
        this.$items = null

        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }

    Carousel.VERSION = '3.3.5'

    Carousel.TRANSITION_DURATION = 600

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    Carousel.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
            case 37:
                this.prev();
                break
            case 39:
                this.next();
                break
            default:
                return
        }

        e.preventDefault()
    }

    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval &&
            !this.paused &&
            (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getItemIndex = function(item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }

    Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0) ||
            (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap) return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }

    Carousel.prototype.to = function(pos) {
        var that = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding) return this.$element.one('slid.bs.carousel', function() {
                that.to(pos)
            }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }

    Carousel.prototype.pause = function(e) {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function() {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function() {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', {
                relatedTarget: relatedTarget,
                direction: direction
            }) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function() {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function() {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.carousel

    $.fn.carousel = Plugin
    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old
        return this
    }

    // CAROUSEL DATA-API
    // =================

    var clickHandler = function(e) {
        var href
        var $this = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
        if (!$target.hasClass('carousel')) return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        Plugin.call($target, options)

        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }
        e.preventDefault()
    }

    $(document)
        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })

}(jQuery);



$('.carousel').carousel({
    interval: 6000
})




const left = '<i class="fa fa-chevron-left" aria-hidden="true"></i>'
const right = '<i class="fa fa-chevron-right" aria-hidden="true"></i>'


// **********owl-carousel***********
$(document).ready(function () {
    $('.nav-carousel .owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        margin:0,
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
        autoplay:false,
        margin: 15,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                dots: true,
                items: 1,
                nav: false,
                autoplay:true,
                dots: false,
            },
            425: {
                dots: true,
                items: 1,
                nav: false,
                autoplay:true,
                dots: false,
            },
            426: {
                dots: true,
                items: 2,
                nav: false,
                autoplay:true,
                dots: false,
            },
            575: {
                dots: true,
                items: 2,
                nav: false,
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
                margin: 50,
                items: 4
            },
            1300: {
                items: 5
            }
        }
    });
    $('.carousel-two .owl-carousel').owlCarousel({
        loop: true,
        margin: 16,
        dots: false,
        nav:true,
        navText:[
            left,
            right
        ], 
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            425: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    });

    $('.carousel-three .owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        margin: 16,
        dots: true,
        autoplay:false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: false,
                nav: false,
                autoplay:true,
            },
            425: {
                items: 1,
                dots: true,
                nav: false,
                dots:false,
                autoplay:true,
            },
            575:{
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1440: {
                items: 3,
            }
        }
    });
    $('.carousel-four .owl-carousel').owlCarousel({
        loop: true,
        autoplay:false,
        nav: false,
        margin:16,
        dots: true,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true,
                nav: false,
                dots:false,
                autoplay:true,
            },
            575: {
                items: 2,
                dots: true,
                nav: false,
            },
            768: {
                items: 3,
                dots: true,
                nav: false,
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
    // ------------------Aplications page Carousel---------------
    $('.carousel-app .owl-carousel').owlCarousel({
        loop: true,
        dots: true,
        nav: false,
        margin: 16,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                dots: true,
                items: 1,
                nav: false,
            },
            425: {
                dots: true,
                items: 1,
                nav: false,
            },
            426: {
                dots: true,
                items: 2,
                nav: false,
            },
            575: {
                dots: true,
                items: 2,
                nav: false,
                
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
                items: 5,
                loop: true
            },
        }
    });
});

// --------------brand page fade animation-----------------------

AOS.init({
  duration:800,
});

// -------------------- pop up-------------------
$(document).ready(function(){
    $(".myBtn").on("click", function(event) {
        console.log("my model: ",$(this).parent().siblings(".myModal").show());
        $(this).parent().siblings(".myModal").show();
    })
    $(".close").on("click", function(event) {
        console.log("my model: ",$(this).parent().siblings(".myModal").show());
        $(this).parent().parent(".myModal").hide();
    })
});

//--------------Disable date and time-------------
function checkBox() {
    let toggleButton = document.getElementById("rental");

        if(toggleButton.checked === true){
            document.getElementById("month-rental").disabled =false;
            document.getElementById("date-rental").disabled =false;
        } else{
            document.getElementById("month-rental").disabled =true;
            document.getElementById("date-rental").disabled =true;
        }
    };



    
    