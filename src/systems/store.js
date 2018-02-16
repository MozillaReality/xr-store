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
    this.colorArr = [0x66ca9c, 0xfa5784, 0x4db5d1];
    this.currentReality = 'magicWindow';
    this.el.sceneEl.setAttribute('vr-mode-ui', {enabled: false});
    this.el.sceneEl.addEventListener('realityChanged', this.realityChanged.bind(this));
    this.addEvents();
    var self = this;
    this.sceneEl.addEventListener('loaded', function () {
      AFRAME.registerInputMappings(mappings);
      AFRAME.currentInputMapping = 'store';

      self.flatMaterials();
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
  },
  addEvents: function () {
    this.isAdded = false;
    this.thumbSelected = 2;
    this.shapeSelected = 0;
    this.colorSelected = 0;
    document.getElementById('thumb0').addEventListener('click', this.thumb0Clicked.bind(this));
    document.getElementById('thumb1').addEventListener('click', this.thumb1Clicked.bind(this));
    document.getElementById('thumb2').addEventListener('click', this.thumb2Clicked.bind(this));
    
    document.getElementById('shape0').addEventListener('click', this.shape0Clicked.bind(this));
    document.getElementById('shape1').addEventListener('click', this.shape1Clicked.bind(this));
    document.getElementById('shape2').addEventListener('click', this.shape2Clicked.bind(this));

    document.getElementById('color0').addEventListener('click', this.color0Clicked.bind(this));
    document.getElementById('color1').addEventListener('click', this.color1Clicked.bind(this));
    document.getElementById('color2').addEventListener('click', this.color2Clicked.bind(this));

    document.getElementById('buttonCart').addEventListener('click', this.buttonCartClicked.bind(this));
  },
  thumb0Clicked: function (evt) {
    this.removeSelected();
    document.getElementById('thumb0').classList.add('selected');
    document.getElementsByTagName('a-scene')[0].style.display = 'none';
    document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-' + this.colorSelected + '-0.png) no-repeat center';
    this.thumbSelected = 0;
  },
  thumb1Clicked: function (evt) {
    this.removeSelected();
    document.getElementById('thumb1').classList.add('selected');
    document.getElementsByTagName('a-scene')[0].style.display = 'none';
    document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-0-1.png) no-repeat center';
    this.thumbSelected = 1;
  },
  thumb2Clicked: function (evt) {
    this.removeSelected();
    document.getElementById('content3D').style.background = 'none';
    document.getElementsByTagName('a-scene')[0].style.display = 'block';
    document.getElementById('thumb2').classList.add('selected');
    this.thumbSelected = 2;
  },
  removeSelected: function () {
    document.getElementById('thumb' + this.thumbSelected).classList.remove('selected');
  },
  shape0Clicked: function (evt) {
    this.changeShape(0);
  },
  shape1Clicked: function (evt) {
    this.changeShape(1);
  },
  shape2Clicked: function (evt) {
    this.changeShape(2);
  },
  changeShape: function (i) {
    document.querySelector('#geo0').setAttribute('visible', false);
    document.querySelector('#geo1').setAttribute('visible', false);
    document.querySelector('#geo2').setAttribute('visible', false);
    document.getElementById('shape' + this.shapeSelected).classList.remove('optionSelected');
    this.shapeSelected = i;
    document.querySelector('#geo' + i).setAttribute('visible', true);
    document.getElementById('shape' + i).classList.add('optionSelected');
    this.updateThumbs();
  },
  color0Clicked: function (evt) {
    this.changeColor(0);
  },
  color1Clicked: function (evt) {
    this.changeColor(1);
  },
  color2Clicked: function (evt) {
    this.changeColor(2);
  },
  changeColor: function (i) {
    document.getElementById('color' + this.colorSelected).classList.remove('optionSelected');
    document.querySelector('#geo0').setAttribute('material', 'color', this.colorArr[i]);
    document.querySelector('#geo1').setAttribute('material', 'color', this.colorArr[i]);
    document.querySelector('#geo2').setAttribute('material', 'color', this.colorArr[i]);
    document.getElementById('color' + i).classList.add('optionSelected');
    this.colorSelected = i;
    this.updateThumbs();
    this.flatMaterials();
  },
  updateThumbs: function () {
    document.querySelector('#thumb0').querySelector('img').src = 'assets/images/thumbs-' + this.shapeSelected + '-' + this.colorSelected + '-0.png';
    document.querySelector('#thumb1').querySelector('img').src = 'assets/images/thumbs-' + this.shapeSelected + '-0-1.png';
    document.querySelector('#thumb2').querySelector('img').src = 'assets/images/thumbs-' + this.shapeSelected + '-' + this.colorSelected + '-2.png';
    if (this.thumbSelected === 0) {
      document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-' + this.colorSelected + '-0.png) no-repeat center';
    } else if (this.thumbSelected === 1) {
      document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-0-1.png) no-repeat center';
    }
  },
  buttonCartClicked: function () {
    if (this.isAdded) {
      document.getElementById('cart').innerHTML = '(0) Cart';
      document.getElementById('cart').style.color = '#181818';
      document.getElementById('cart').style.fontWeight = 'normal';
      document.getElementById('buttonCart').innerHTML = 'Add to cart';
      document.getElementById('buttonCart').style.backgroundColor = '#181818';
    } else {
      document.getElementById('cart').innerHTML = '(1) Cart';
      document.getElementById('cart').style.color = '#b7374c';
      document.getElementById('cart').style.fontWeight = 'bolder';
      document.getElementById('buttonCart').innerHTML = 'Added!';
      document.getElementById('buttonCart').style.backgroundColor = '#b7374c';
    }
    this.isAdded = !this.isAdded;
  },
  flatMaterials: function () {
    document.querySelector('#geo0').getObject3D('mesh').material.flatShading = true;
    // document.querySelector('#geo1').getObject3D('mesh').material.flatShading = true;
    document.querySelector('#geo2').getObject3D('mesh').material.flatShading = true;
  }
});