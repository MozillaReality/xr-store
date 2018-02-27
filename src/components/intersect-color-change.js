/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('intersect-color-change', {
  init: function () {
    var el = this.el;
    var material = el.getAttribute('material');
    if (material) {
      var initialColor = material.color;
      el.setAttribute('initialColor', material.color);
      var self = this;

      el.addEventListener('mousedown', function (evt) {
        el.setAttribute('material', 'color', '#EF2D5E');
      });

      el.addEventListener('mouseup', function (evt) {
        el.setAttribute('material', 'color', self.isMouseEnter ? '#cccccc' : el.getAttribute('initialColor'));
      });

      el.addEventListener('mouseenter', function () {
        el.setAttribute('material', 'color', '#cccccc');
        self.isMouseEnter = true;
      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('material', 'color', el.getAttribute('initialColor'));
        self.isMouseEnter = false;
      });
    }
  }
});
