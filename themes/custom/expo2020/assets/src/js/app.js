import '@/scss/app.scss'

import $ from 'jquery'
window.$ = window.JQuery = $;

import underscore from 'underscore';
import wiatforimage from 'jquery.waitforimages';

import(
  '@/js/app/fontawesome'
  ).then(module => {
  new module.default()
})

import Scrollify from './app/scrollify';
import Slick from './app/slick';
import Modaal from './app/modaal';

new Scrollify();
new Slick();
new Modaal();

(function ($, Drupal) {
  'use strict';


  var homeBanners = {

    duration: 3000,
    delay: 12000,

    init: function() {
      var $banners = $('.banner-block-content');
      var that = this;

      this.banner  = $('.banner-block-content');
      this.rows    = $('.field-collection-container .field-collection-view', this.banner);
      this.total    = this.rows.length;
      this.start    = 0;
      this.bootstrap = 'col-sm-6 col-sm-offset-6';


      // Convert all images into a div with a bg.
      this.rows.each(function(i, e){
        var $img = $('div.img', $(this));

        $(this).wrapInner('<div class="inner"></div>');
        $(this).wrapInner('<div class="'+that.bootstrap+'"></div>');

        $img.attr('data-banner-index', i).appendTo($('.images', that.banner));

        $(this).attr('data-banner-index', i).attr('class', 'text').appendTo($('.texts .container', that.banner));
      });

      $('.field-collection-container', this.banner).remove();

      this.imgDivs = $('.images .img', this.banner);
      this.txtDivs = $('.texts .text', this.banner);

      this.imgDivs.eq(this.start).css('background-image', 'url(' + this.imgDivs.eq(this.start).data('img-src') + ')');
      this.imgDivs.eq(this.start).addClass('current').show();

      this.txtDivs.eq(this.start).addClass('current').fadeIn(this.duration);

      this.txtDivs.find('.inner').on('mouseenter', function(){
        $('.shape', this.banner).addClass('hover');
      }).on('mouseleave', function(){
        $('.shape', this.banner).removeClass('hover');
      });

      this.txtDivs.on('click', function(e){
        e.stopPropagation();
        var $link = $('a:first', $(this));
        if ($link.length) {
          window.location = $link.attr('href');
        }
      });

      // $('a', this.txtDivs).addClass("btn-white");

      this.reIndex();

    },

    reIndex: function(){
      this.imgDivs.not('.current').css('z-index', 8);
      this.imgDivs.filter('.current').css('z-index', 9);
    },

    // Fade in
    showImage: function(i){
      var $now = this.imgDivs.eq(i);
      var $txt = this.txtDivs.eq(i);
      var that = this;

      this.reIndex();

      $now.hide();

      $now.css('background-image','url(' + $now.data('img-src') + ')')
        .waitForImages(function() {

          that.imgDivs.removeClass('current');
          that.txtDivs.removeClass('current').fadeOut(that.duration);

          $now.css('z-index', 10).fadeIn(that.duration).addClass('current');

          $txt.hide().fadeIn(that.duration).addClass('current');

          if ($(window).width() > 768) {
            // Shapes
            $('body').trigger('change-shapes');
          }

          // Loop
          that.startTimer();

        }, $.noop, true);
    },

    startTimer: function(){
      var that = this;

      setTimeout(function(){
        that.rotate(that);
      }, that.delay);

    },

    // Increment or loop
    rotate: function(){

      if (this.total == 1) {
        return;
      }

      this.start++;
      if (this.start >= this.total) {
        this.start = 0;
      }
      this.showImage(this.start);
    }
  };

  $(function(){

    var ban = homeBanners;
    ban.init();

    setTimeout(function(){
      ban.rotate();
    }, (ban.delay - ban.duration));
  });


  var homeShapes = {
    init: function(){

      var that = this;
      var $shape = $('.shape svg polygon');

      this.steps = $('animate', $shape);
      this.currentShape = 0;

      this.steps.eq(0).attr('to', $shape.attr('points'));

      $('body').on('change-shapes', function(){
        that.changeShapes();
      });

      $('.shape').fadeIn(500, function(){
        $(this).addClass('hover-ready');
      });

    },
    resizeSvg: function(){
      var height = $('#block-bean-homepage-banner').height();
      var margin = parseInt($('#home-banner-shapes').css('margin-top'), 10) + parseInt($('#home-banner-shapes').css('margin-bottom'), 10);

      $('#home-banner-shapes').css('height', height - margin);
    },
    changeShapes: function(){

      this.currentShape++;

      if (this.currentShape >= this.steps.length) {
        this.currentShape = 0;
      }

      var animating = this.steps.eq(this.currentShape).get(0);

      try {
        animating.beginElement();
      } catch (err) {
        // ... IE8, IE9. Should work by time page loaded.
      }
    }
  };


  $(function(){
    homeShapes.init();
  });

  Drupal.behaviors.expo2020 = {
    attach: function (context, settings) {
      $(document).ready(function () {


      });
    }
  };
})(jQuery, Drupal);

import(
    /* webpackChunkName: "fontawesome" */
    '@/js/app/fontawesome'
).then(module => {
    new module.default()
})

/**
 * Mobile menu
 */

$(window).on('resize', () => {
    let width = document.documentElement.clientWidth;
    let done = document.body.classList.contains('mm-once');

    //if (width <= 768 && !done) {
      document.body.classList.add('mm-once')

      import(
          /* webpackChunkName: "mmenu" */
          '@/js/app/mmenu'
      ).then(module => {
          new module.default()
      })
    //}
});

$(window).resize();



$(window).scroll(function() {
  var hT = $('.beforepannel').offset().top, // The vertical distance between the top of the page and the top of the element.
    hH = $('.beforepannel').outerHeight(), // The height of the element, including padding and borders.
    wH = $(window).height(), // Height of the window without margins, padding, borders.
    wS = $(this).scrollTop(), // The vertical distance between the top of the page and the top of the viewport.

    hT1 = $('.footer-section').offset().top,
    hH1 = $('.footer-section').outerHeight();
  //console.log(hT) + console.log(hH) + console.log(wH) + console.log(wS) + console.log(hT1) + console.log(hH1);

  if (hH < wH) {
    /*if (wS > (hT + hH - wH) && wS < (hT1 - wH) ) {
        $(".pagination a").css("display", "block");
    } else {
        $(".pagination a").css("display", "none");
    }*/
    if(wS > (hT1 + hH1 - wH) ) {
      $(".pagination a").css("display", "none");
    }
  }

  if ($(this).scrollTop() != 0) {
    $("#to-top").fadeIn();
  } else {
    $("#to-top").fadeOut();
  }

});

$("#to-top").click(function () {
  $.scrollify.move(0);
});