AFRAME.registerComponent('store-controls', {
  schema: {
    hand: {default: 'left'}
  },

  init: function () {
    var el = this.el;
    var self = this;
    el.addEventListener('scale', function (evt) {
      // if (evt.detail.axis[0] === 0 && evt.detail.axis[1] === 0 || self.previousAxis === evt.detail.axis[1]) { return; }
      // sconsole.log(evt.detail);
    });
    self.touchStarted = false;
    el.addEventListener('startScale', function () {
      // console.log('----');
      self.touchStarted = true;
    });
    // document.getElementById('acamera').setAttribute('orbit-controls', 'position', '0 0.5 0');
  }
});