import $ from 'jquery';
import scrollify from 'jquery-scrollify';

window.jQuery = $;

export default class Scrollify {
  constructor() {
    $.scrollify({
      section: ".panel",
      sectionName: false,
      interstitialSection: ".header, .extra, .latest-news, .footer",
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset: 0,
      scrollbars: true,
      standardScrollElements: "",
      setHeights: false,
      overflowScroll: true,
      updateHash: true,
      touchScroll: true,
      before: function(i, panels) {
        var active = $(".slide.active");
        var ref = panels[i].attr("data-section-name");
        $(".pagination a").css("display", "block");

        $(".pagination .active").removeClass("active");
        $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
        active.addClass("remove");

        //setTimeout(function() {
        $("[data-slide=" + i + "]").addClass("active");
        active.removeClass("remove active");
        //},300);

        // $('".' + ref+'"').addClass("actived");
      },
      after: function() {

      },
      afterResize: function() {

      },
      afterRender: function() {
        $(".pagination a").on("click",$.scrollify.move);
      }
    })
  }
}
