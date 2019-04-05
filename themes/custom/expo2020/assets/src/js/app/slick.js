import slick from 'slick-carousel'

export default class Slick {
  constructor() {
    this.init();
  }

  init() {
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      infinite: true,
      speed: 500
    });

    $('.slick-prev').append('<i class="fas fa-long-arrow-left"></i>');
    $('.slick-next').append('<i class="fas fa-long-arrow-right"></i>');
  }
}