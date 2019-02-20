import modaal from 'modaal'

export default class Modaal {
  constructor() {
    this.init();
  }

  init() {
    // Video Modal
    $('.modaal-video-trigger').modaal({
      type: 'video',
    });
  }
}