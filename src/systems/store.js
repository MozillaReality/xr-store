AFRAME.registerSystem('store', {
  init: function () {
    var mappings = {
      behaviours: {},
      mappings: {
        store: {
          common: {
            'grip.down': 'undo',
            'trigger.changed': 'select'
          },

          'vive-controls': {
            'axis.move': 'scale',
            'trackpad.touchstart': 'startScale',
            'menu.down': 'toggleMenu'
          },

          'daydream-controls': {
            'trackpad.changed': 'scale',
            'trackpad.down': 'startScale',
            'menu.down': 'toggleMenu'
          },

          'oculus-touch-controls': {
            'axis.move': 'scale',
            'abutton.down': 'toggleMenu',
            'xbutton.down': 'toggleMenu'
          },

          'windows-motion-controls': {
            'axis.move': 'scale',
            'menu.down': 'toggleMenu'
          },
        }
      }
    };
    this.currentReality = 'magicWindow';
    this.el.sceneEl.setAttribute('vr-mode-ui', {enabled: false});
    this.el.sceneEl.addEventListener('realityChanged', this.realityChanged.bind(this));
    this.sceneEl.addEventListener('loaded', function () {
      AFRAME.registerInputMappings(mappings);
      AFRAME.currentInputMapping = 'store';
    });
  },
  realityChanged: function (data) {
    if (data.detail !== this.currentReality) {
      this.currentReality = data.detail;
      this.changeReality();
    }
  },
  changeReality: function () {
    switch (this.currentReality) {
      case 'ar':
        document.getElementById("header").classList.add('ar');
        document.getElementById('title').style.display = 'none';
        document.getElementById('visualSheet').classList.add('ar');
        document.getElementById('content3D').classList.add('ar');
        document.getElementById('productOptions').classList.add('ar');
        var productOptionArr = document.getElementsByClassName('productOption');
        for (var i = 0; i < productOptionArr.length; i++) {
          productOptionArr[i].classList.add('ar');
        }
        document.getElementById('brand').style.display = 'none';
        document.getElementById('productName').style.display = 'none';
        document.getElementById('price').style.display = 'none';
        document.getElementById('comments').style.display = 'none';
        document.getElementById("thumbs").classList.add('ar');
        document.getElementById("buttonCart").classList.add('ar');
        document.getElementById("container").classList.add('ar');
        document.getElementById('footer').style.display = 'none';
        break;
      case 'magicWindow':
        
        break;
      case 'vr':
        
        break;
    }
  }
});