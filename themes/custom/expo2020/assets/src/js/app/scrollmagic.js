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
    let $body = $("body");
    if ($body.hasClass('node--type-home-page')
      || $body.hasClass('node--type-pavilion-landing-page')
      || $body.hasClass('node--type-opportunities')) {
      var controller = new ScrollMagic.Controller();


      // define movement of panels
      var wipeAnimation = new TimelineMax()
        .fromTo("#slideContainer .panel-p1", 10, {y: "100%"}, {
          y: "0%",
          ease: Linear.easeInOut
        })
        .fromTo("#slideContainer .panel-p2", 10, {y: "100%"}, {
          y: "0%",
          ease: Linear.easeInOut
        })

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
      $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var viewportTop = $(window).scrollTop();
        var viewportMiddle = viewportTop + 0.5 * $(window).height();
        return elementTop < viewportMiddle;
      };

      $.fn.isScrollingOut = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        return elementTop == viewportTop;
      };

      $(window).on('resize scroll', function () {
        $('.panel').each(function () {
          var slideID = $(this).attr('id');
          if ($(this).isScrollingOut()) {
            var txtElemt = $("#txt-" + slideID);
            if (slideID == 'slide1') {
              var nextSlide = $('#slide2').offset();
            }
            if (slideID == 'slide0') {
              var nextSlide = $('#slide1').offset();
            }
            if (typeof nextSlide != 'undefined') {
              // Move text on slide parallex way
              var txtOffsetY = parseInt(1.25 * (nextSlide.top - ($(this).outerHeight() + $(this).offset().top)), 10);
              $("#txt-" + slideID).css({transform: 'translate(0,' + txtOffsetY + 'px)'});
              // Be a little fancier by bluring the image while scrolling up
              /*var blurAmount = parseInt(0 - txtOffsetY / 25, 10);

              var mobile = window.matchMedia("(max-width: 768px)");
              if(!mobile.matches) {
                if (blurAmount % 5 == 0) {
                  blurAmount = blurAmount / 5;
                  $("#"+slideID+" img").css({
                    'filter': 'blur('+blurAmount+'px)',
                    '-webkit-filter': 'blur('+blurAmount+'px)',
                    '-moz-filter': 'blur('+blurAmount+'px)',
                    '-o-filter': 'blur('+blurAmount+'px)',
                    '-ms-filter': 'blur('+blurAmount+'px)'
                  });
                }
              }*/
            }
          }
          if ($(this).isInViewport()) {
            $('.pips li div').removeClass('active');
            $('#pip-' + slideID).addClass('active');
          } else {
            $('#pip-' + slideID).removeClass('active');
          }
        });
      });
    }

  }

}