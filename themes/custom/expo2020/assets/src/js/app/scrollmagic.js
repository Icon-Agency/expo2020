import $ from 'jquery';
import _ from 'lodash';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
import TweenMax from "gsap/TweenMax";

window.jQuery = $;

export default class Scrollmagic {
  constructor() {

		window.test = this;

    this.pinSliderController = new ScrollMagic.Controller();

    this.init();
  }

	pinSliderInit() {
		$('body').addClass('pinSlider-active');
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
    this.pinSliderScene = new ScrollMagic.Scene({
        triggerElement: "#pinSlider",
        triggerHook: "onLeave",
        duration: "500%"
      })
      .setPin("#pinSlider")
      .setTween(wipeAnimation)
      .addTo(this.pinSliderController);

	}

	pinSliderDestroy() {
			$('body').removeClass('pinSlider-active');
			this.pinSliderScene.destroy(true);
			this.pinSliderController.destroy(true);
	}

  init() {
    // Banner animation
    //
    let $body = $("body");
    if ($body.hasClass('node--type-home-page')
      || $body.hasClass('node--type-pavilion-landing-page')
      || $body.hasClass('node--type-opportunities')) {
			var breakpoint = 768;

			var _this = this;

			$(window).resize(_.debounce(function () {
				if ($(window).width() < breakpoint) {
					this.pinSliderDestroy();
				} else if (!$('body').hasClass('pinSlider-active')) {
					//	_this.pinSliderInit();
				}
			}.bind(this)));

			if ($(window).width() < breakpoint) {
				this.pinSliderDestroy();
			} else if (!$('body').hasClass('pinSlider-active')) {
				this.pinSliderInit();
			}

      // Pips
      
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
                 var scaleAmount = blurAmount / 25;
                 if(scaleAmount < 1) {
                   scaleAmount = 1;
                 } else {
                   scaleAmount = Math.log(scaleAmount) /2 + 1;
                 }
                 $("#"+slideID+" img").css({
                   'transform': 'scale(' + scaleAmount + ')',
                   '-webkit-transform': 'scale(' + scaleAmount + ')',
                   '-moz-transform': 'scale(' + scaleAmount + ')',
                   '-ms-transform': 'scale(' + scaleAmount + ')',
                   '-o-transform': 'scale(' + scaleAmount + ')'
                 });
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

    var controller = new ScrollMagic.Controller();
    //make header sticky to top
    new ScrollMagic.Scene({
      triggerElement: "#header"
    })
        .setPin("#header")
        .addTo(controller);

  }

}
