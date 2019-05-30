import '@/scss/app.scss'

import $ from 'jquery'
window.$ = window.JQuery = $;

import underscore from 'underscore';
import wiatforimage from 'jquery.waitforimages';
import jqCountdown from 'jquery-countdown';

import(
  '@/js/app/fontawesome'
  ).then(module => {
  new module.default()
})

/*import Scrollify from './app/scrollify';*/
import Slick from './app/slick';
import Modaal from './app/modaal';
import Scrollmagic from './app/scrollmagic';

/*new Scrollify();*/
new Slick();
new Modaal();
new Scrollmagic();

(function ($, Drupal) {
  'use strict';


  var homeBanners = {

    duration: 5858,
    delay: 6000,

    init: function() {
      var that = this;

      this.banner  = $('.banner-block-content');
      this.wrapper = $('.field-collection-container .field-collection-view');
      this.rows    = $('.field-collection-container .field-collection-view', this.banner);
      this.total   = this.rows.length;
      this.start    = 0;
      this.bootstrap = 'col-xl-6 col-lg-7 col-md-9 h-100';

      this.wrapper.each(function(){
        $(this).removeClass('hidden');
      });

      // Convert all images into a div with a bg.
      this.rows.each(function(i, e){
        var $img = $('div.img', $(this));
        var $mask = $('.angled-mask', $(this));
        var $imagecredit = $('.image-credit', $(this));
        $(this).wrapInner('<div class="inner"></div>');
        $(this).wrapInner('<div class="'+that.bootstrap+'"></div>');

        $img.attr('data-banner-index', i).appendTo($('.images', that.banner));
        $mask.attr('data-banner-index', i).appendTo($('.images', that.banner));
        $imagecredit.attr('data-banner-index', i).appendTo($('.images', that.banner));

        $(this).attr('data-banner-index', i).attr('class', 'text').appendTo($('.texts .container', that.banner));
      });

      $('.field-collection-container', this.banner).remove();

      this.imgDivs = $('.images .img', this.banner);
      this.txtDivs = $('.texts .text', this.banner);
      this.imgCreDivs = $('.images .image-credit', this.banner);

      this.imgDivs.eq(this.start).css('background-image', 'url(' + this.imgDivs.eq(this.start).data('img-src') + ')');
      this.imgDivs.eq(this.start).addClass('current').show();

      this.txtDivs.eq(this.start).addClass('current').fadeTo(500, 1);

      this.imgCreDivs.eq(this.start).addClass('current').show();

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

      this.imgCreDivs.not('.current').css('z-index', 8);
      this.imgCreDivs.filter('.current').css('z-index', 9);
    },

    // Fade in
    showImage: function(i){
      var $now = this.imgDivs.eq(i);
      var $txt = this.txtDivs.eq(i);
      var $imgcre = this.imgCreDivs.eq(i);
      var that = this;

      this.reIndex();

      $now.hide();
      $imgcre.hide();

      $now.css('background-image','url(' + $now.data('img-src') + ')')
        .waitForImages(function() {

          that.imgDivs.removeClass('current');
          //that.txtDivs.removeClass('current').fadeTo(that.duration, 0);
          that.imgCreDivs.removeClass('current');

          $now.css('z-index', 10).fadeTo(that.duration, 1).addClass('current');

          //$txt.hide().fadeTo(10, 1).addClass('current');

          $imgcre.css('z-index', 10).fadeTo(that.duration, 1).addClass('current');

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

  $(function(){
    triggerPopup();
  });

  Drupal.behaviors.expo2020 = {
    attach: function (context, settings) {
      $(document).ready(function () {
        if(typeof settings.countdownDate != 'undefined'){
          $('#expo-2020-countdown').countdown(settings.countdownDate, function(event) {
            $(this).find('#days').html(event.strftime('%D'));
            $(this).find('#hours').html(event.strftime('%H'));
            $(this).find('#minutes').html(event.strftime('%M'));
            $(this).find('#seconds').html(event.strftime('%S'));
          });
        }

        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  };
})(jQuery, Drupal);

function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (decodeURIComponent(sParameterName[0]) === sParam || sParameterName[0] === sParam) {
      return (sParameterName[1] === undefined || sParameterName[1] === '') ? false : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}

function triggerPopup(){
  let trigger_href = getUrlParameter('detpup');
  if (trigger_href){
    $('a[href="#'+ trigger_href +'"]').first().trigger('click');
  }
}


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
  var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (!isMobile) {
    if ($(this).scrollTop() > 150){
      $('#header').addClass("sticky");
    }
    else{
      $('#header').removeClass("sticky");
    }
  } else {

  }
})

$("#to-top").click(function () {
    $("body,html").animate({scrollTop: 0}, 500);
});

$('.modaal-video-trigger').hover(function () {
  $('.image-style-gallery-silder').css('filter', 'brightness(120%)');
}, function () {
  $('.image-style-gallery-silder').css('filter', 'brightness(100%)');
});

/* search form functions */
var searchInput = $('#block-expo2020-header-site-search-block .header-search-form .form-item input');
var searchButton = $('#block-expo2020-header-site-search-block .search-trigger');
var searchForm = $('#block-expo2020-header-site-search-block .header-site-search-content-wrapper');
var searchInputBtn = $('#block-expo2020-header-site-search-block .header-site-search-content-wrapper button');

// Open search form helper function.
var searchOpen = function(searchForm, searchInput) {
  $(searchForm).addClass('open');
  /*$(this).attr('aria-expanded', 'true');*/

  // Wait for the width to transition before setting focus.
  setTimeout(function() {
    $(searchInput).focus();
  }, 250);
};

// Close search form helper function.
var searchClose = function(focusItem, searchForm) {
  $(searchForm).removeClass('open');
  //$(searchButton).attr('aria-expanded', 'false');
  $(focusItem).focus();
};

// If they click the search icon, open the form.
$(searchButton).on('click', function () {
  searchOpen(searchForm, searchInput);
  return false;
});


// If they click the search button, but haven't entered keywords, close it.
$(searchInputBtn).click(function (){
  if (!$(searchInput).val()) {
    searchClose(searchButton, searchForm);
    return false;
  }
});

// If they click outside of the search form when it's open, close it.
$(document).click(function(e) {
  if( searchForm.hasClass('open') && searchForm.has(e.target).length === 0) {
    searchClose(searchButton, searchForm);
  }
});

// If they the search form is focused when not active, open it.
$(searchInput).focus(function() {
  if(!searchForm.hasClass('open')) {
    searchOpen(searchForm, searchInput);
  }
});

// If they tab or esc without entering keywords, close it.
$(searchForm).keydown(function(e) {
   var keyCode = e.keyCode || e.which;

   if (!$(searchInput).val() && (keyCode == 9 || keyCode == 27)) {
    searchClose(searchButton, searchForm);
   }
});

let $body = $("body");
if ($body.hasClass('path-news')) {
  if($('.panels.main-container .view-display-id-news_listing_page nav .pagination')[0]
      || $('.panels.main-container.view-display-id-whats_on nav .pagination')[0] ) {
    $('.panels.main-container .view-footer').css('margin-bottom', '2rem');
  } else {
    $('.panels.main-container .view-footer').css('margin-bottom', '6rem');
  }
}