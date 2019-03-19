import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
import TweenMax from "gsap/TweenMax";

window.jQuery = $;

export default class Scrollmagic {
    constructor() {
        this.init();
    }

    init() {
        // Banner animation
        //
        var controller = new ScrollMagic.Controller();


        // define movement of panels
        var wipeAnimation = new TimelineMax()
            .fromTo("#slideContainer .panel-p1", 5, {y: "100%"}, {y: "0%", ease: Linear.easeInOut})
            .fromTo("#slideContainer .panel-p2", 5, {y: "100%"}, {y: "0%", ease: Linear.easeInOut})

        // create scene to pin and link animation
        new ScrollMagic.Scene({
            triggerElement: "#pinSlider",
            triggerHook: "onLeave",
            duration: "500%"
        })
            .setPin("#pinSlider")
            .setTween(wipeAnimation)
            .addTo(controller);

        // Pips
        //
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        $(window).on('resize scroll', function() {
            $('.panel').each(function() {
                var slideID = $(this).attr('id');
                if ($(this).isInViewport()) {
                    $('.pips li div').removeClass('active');
                    $('#pip-' + slideID).addClass('active');
                    $('.slide').removeClass('active remove');
                    $("#txt-" + slideID).addClass("active", 2000);
                } else {
                    $('#pip-' + slideID).removeClass('active');
                    $("#txt-" + slideID).addClass("remove", 2000);
                }
            });
        });
    }

}