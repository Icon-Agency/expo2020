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
  }
}