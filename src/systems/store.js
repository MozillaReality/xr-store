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
    // this.el.sceneEl.setAttribute('vr-mode-ui', {enabled: false});
    this.el.sceneEl.addEventListener('realityChanged', this.realityChanged.bind(this));
    this.addEvents();
    var self = this;
    this.addNewStyles();
    this.sceneEl.addEventListener('loaded', function () {
      AFRAME.registerInputMappings(mappings);
      AFRAME.currentInputMapping = 'store';
      // console.log(AFRAME.components['ar-mode-ui'].Component.prototype.init);
      // this.sceneEl.setAttribute('ar-mode-ui', {enabled: false});
      // this.sceneEl.setAttribute('vr-mode-ui', {enabled: false});
      self.flatMaterials();
      self.addStorePanel();
      navigator.getVRDisplays().then(function (displays) {
        if (displays.length) {
          self.replaceVRIcon();
        }
      });
    });
  },
  realityChanged: function (data) {
    if (data.detail !== this.currentReality) {
      this.currentReality = data.detail;
      this.changeReality();
    }
  },
  changeReality: function () {
    var productOptionArr = document.getElementsByClassName('productOption');
    switch (this.currentReality) {
      case 'ar':
        document.getElementById('header').classList.add('ar');
        document.getElementById('title').style.display = 'none';
        document.getElementById('visualSheet').classList.add('ar');
        document.getElementById('content3D').classList.add('ar');
        document.getElementById('productOptions').classList.add('ar');
        for (var i = 0; i < productOptionArr.length; i++) {
          productOptionArr[i].classList.add('ar');
        }
        document.getElementById('brand').style.display = 'none';
        document.getElementById('productName').style.display = 'none';
        document.getElementById('price').style.display = 'none';
        document.getElementById('comments').style.display = 'none';
        document.getElementById('thumbs').classList.add('ar');
        document.getElementById('buttonCart').classList.add('ar');
        document.getElementById('container').classList.add('ar');
        document.getElementById('footer').style.display = 'none';
        break;
      case 'magicWindow':
        document.getElementById('header').classList.remove('ar');
        document.getElementById('title').style.display = 'block';
        document.getElementById('visualSheet').classList.remove('ar');
        document.getElementById('content3D').classList.remove('ar');
        document.getElementById('productOptions').classList.remove('ar');
        for (var i = 0; i < productOptionArr.length; i++) {
          productOptionArr[i].classList.remove('ar');
        }
        document.getElementById('brand').style.display = 'block';
        document.getElementById('productName').style.display = 'block';
        document.getElementById('price').style.display = 'block';
        document.getElementById('comments').style.display = 'block';
        document.getElementById('thumbs').classList.remove('ar');
        document.getElementById('buttonCart').classList.remove('ar');
        document.getElementById('container').classList.remove('ar');
        document.getElementById('footer').style.display = 'block';
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

    this.buttonCartClicked = this.buttonCartClicked.bind(this);
    document.getElementById('buttonCart').addEventListener('click', this.buttonCartClicked);
  },
  thumb0Clicked: function (evt) {
    this.removeSelected();
    document.getElementById('thumb0').classList.add('selected');
    document.getElementsByTagName('a-scene')[0].style.display = 'none';
    document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-' + this.colorSelected + '-0.png) no-repeat center #ffffff';
    this.thumbSelected = 0;
  },
  thumb1Clicked: function (evt) {
    this.removeSelected();
    document.getElementById('thumb1').classList.add('selected');
    document.getElementsByTagName('a-scene')[0].style.display = 'none';
    document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-0-1.png) no-repeat center #ffffff';
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
      document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-' + this.colorSelected + '-0.png) no-repeat center #ffffff';
    } else if (this.thumbSelected === 1) {
      document.getElementById('content3D').style.background = 'url(assets/images/product-' + this.shapeSelected + '-0-1.png) no-repeat center #ffffff';
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
  },
  addStorePanel: function () {

    var containerUI = document.createElement('a-entity');
    containerUI.setAttribute('id', 'storePanel');
    containerUI.setAttribute('position', '1.5 1.7 -2.75');
    containerUI.setAttribute('rotation', '0 -30 0');
    this.el.sceneEl.appendChild(containerUI);

    this.addPlane({
      id: 'main-vr',
      width: 2,
      height: 1.5,
      color: 'white',
      parent: containerUI
    });
    this.addText({
      text: 'Mozilla',
      id: 'brand-vr',
      font: 'OpenSans-Bold',
      size: 2,
      color: '#181818',
      position: '0.15 0.55 0',
      parent: containerUI
    });
    this.addText({
      text: 'Basic Mesh',
      id: 'product-vr',
      font: 'OpenSans-Regular',
      size: 3,
      color: '#181818',
      position: '0.65 0.35 0',
      parent: containerUI
    });
    this.addText({
      text: '(0) Cart',
      id: 'cart-vr',
      font: 'OpenSans-Regular',
      size: 1.8,
      color: '#181818',
      position: '1.5 0.4 0',
      parent: containerUI
    });
    this.addText({
      text: 'Shape',
      id: 'shape-vr',
      font: 'OpenSans-Regular',
      size: 1.8,
      color: '#181818',
      position: '0.06 0.2 0',
      parent: containerUI
    });
    this.addImage({
      id: 'shape0-vr',
      src: 'shape0',
      size: 0.25,
      position: '-0.75 0 0.01',
      collidable: true,
      parent: containerUI
    });
    this.addImage({
      id: 'shape1-vr',
      src: 'shape1',
      size: 0.25,
      position: '-0.5 0 0.01',
      collidable: true,
      parent: containerUI
    });
    this.addImage({
      id: 'shape2-vr',
      src: 'shape2',
      size: 0.25,
      position: '-0.25 0 0.01',
      collidable: true,
      parent: containerUI
    });
    this.addPlane({
      id: 'shapeBar-vr',
      width: 0.2,
      height: 0.01,
      position: '-0.75 -0.15 0.01',
      color: '#181818',
      parent: containerUI
    });

    this.addText({
      text: 'Color',
      id: 'color-vr',
      font: 'OpenSans-Regular',
      size: 1.8,
      color: '#181818',
      position: '1.06 0.2 0',
      parent: containerUI
    });
    this.addImage({
      id: 'color0-vr',
      src: 'color0',
      size: 0.25,
      position: '0.25 0 0.01',
      collidable: true,
      parent: containerUI
    });
    this.addImage({
      id: 'color1-vr',
      src: 'color1',
      size: 0.25,
      position: '0.5 0 0.01',
      collidable: true,
      parent: containerUI
    });
    this.addImage({
      id: 'color2-vr',
      src: 'color2',
      size: 0.25,
      position: '0.75 0 0.01',
      collidable: true,
      parent: containerUI
    });
    this.addPlane({
      id: 'colorBar-vr',
      width: 0.2,
      height: 0.01,
      position: '0.25 -0.15 0.01',
      color: '#181818',
      parent: containerUI
    });

    this.addText({
      text: 'Price: $0.00 + Shipping & Import Fees',
      id: 'price-vr',
      font: 'OpenSans-Regular',
      size: 1.2,
      color: '#181818',
      position: '-0.25 -0.3 0',
      parent: containerUI
    });
    this.addPlane({
      id: 'colorBar-vr',
      width: 0.2,
      height: 0.01,
      position: '0.25 -0.15 0.01',
      color: '#181818',
      parent: containerUI
    });
    this.addButton({
      id: 'addBtn-vr',
      text: 'Add to cart',
      textColor: '#ffffff',
      width: 0.8,
      height: 0.2,
      color: '#181818',
      parent: containerUI,
      position: '-0.45 -0.5 0.01',
      onclick: this.buttonCartClicked
    });
  },
  addPlane: function (params) {
    var uiEl = document.createElement('a-entity');
    uiEl.setAttribute('geometry', {
      primitive: 'plane',
      width: params.width,
      height: params.height
    });
    uiEl.setAttribute('position', params.position || '0 0 0');
    uiEl.setAttribute('material', {
      shader: 'flat',
      transparent: true,
      color: params.color,
      side: 'double'
    });
    if (params.collidable) {
      uiEl.setAttribute('class', 'collidable');
    }
    params.parent.appendChild(uiEl);
  },
  addText: function (params) {
    var uiEl = document.createElement('a-entity');

    uiEl.setAttribute('text', {
      value: params.text,
      font: 'assets/fonts/' + params.font + '.json',
      align: params.align || 'left',
      shader: 'msdf',
      color: params.color
    });
    uiEl.setAttribute('id', params.id);
    uiEl.setAttribute('scale', {
      x: params.size,
      y: params.size,
      z: params.size
    });
    if (params.collidable) {
      uiEl.setAttribute('class', 'collidable');
    }
    uiEl.setAttribute('position', params.position || '0 0 0');
    params.parent.appendChild(uiEl);
  },
  addImage: function (params) {
    var uiEl = document.createElement('a-entity');

    uiEl.setAttribute('id', params.id);
    uiEl.setAttribute('geometry', {
      primitive: 'plane',
      width: params.size,
      height: params.size
    });
    uiEl.setAttribute('material', {
      shader: 'flat',
      transparent: true,
      src: 'assets/images/' + params.src + '.png'
    });
    if (params.collidable) {
      uiEl.setAttribute('class', 'collidable');
    }
    uiEl.setAttribute('position', params.position || '0 0 0');
    params.parent.appendChild(uiEl);
  },
  addButton: function (params) {
    var uiEl = document.createElement('a-entity');
    uiEl.setAttribute('id', params.id);
    params.parent.appendChild(uiEl);
    uiEl.setAttribute('position', params.position || '0 0 0');
    uiEl.setAttribute('onclick', params.onclick);
    this.addPlane({
      id: params.id + '-bg',
      width: params.width,
      height: params.height,
      color: params.color,
      parent: uiEl
    });
    this.addText({
      text: params.text,
      id: params.id + '-text',
      font: 'OpenSans-Bold',
      align: 'center',
      position: '0 -0.05 0',
      size: 1.4,
      color: params.textColor,
      parent: uiEl
    });
  },
  addNewStyles: function (){
    if (AFRAME.utils.getUrlParameter('ui') === 'false') {
      return;
    }
    // Add styles to support multiple buttons and to have consistent design
    var sheet = document.createElement('style');
    sheet.innerHTML = '.a-enter-vr-button {background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIwNDhweCIgaGVpZ2h0PSIyMDQ4cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwNDggMjA0OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRpdGxlPm1hc2s8L3RpdGxlPjxjaXJjbGUgb3BhY2l0eT0iMC40IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3g9IjEwMjQiIGN5PSIxMDI0IiByPSI4ODMuNTg4Ii8+PGc+PGc+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYwOS4xMDcsNjI1Ljc2OGg0MDIuOTY4djc0LjcwN0g2NzYuNzgzdjI4My40NDdoLTY3LjY3NlY2MjUuNzY4eiIvPjwvZz48Zz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTQzOC44OTMsMTQyMi4yMzJoLTQwMi45Njl2LTc0LjcwN2gzMzUuMjkzdi0yODMuNDQ2aDY3LjY3NlYxNDIyLjIzMnoiLz48L2c+PC9nPjwvc3ZnPg==) 100% 100%/100% 100% no-repeat;';
    sheet.innerHTML += 'border: 0;';
    sheet.innerHTML += 'bottom: 0;';
    sheet.innerHTML += 'cursor: pointer;';
    sheet.innerHTML += 'min-width: 40px;';
    sheet.innerHTML += 'min-height: 40px;';
    sheet.innerHTML += 'padding-right: 5%;';
    sheet.innerHTML += 'padding-top: 4%;';
    sheet.innerHTML += 'position: absolute;';
    sheet.innerHTML += 'right: 0;';
    sheet.innerHTML += 'z-index: 9999;';
    sheet.innerHTML += 'margin-right: 5px;}';
    sheet.innerHTML += '.a-enter-vr-button:active,.a-enter-vr-button:hover {background-color: rgba(0,0,0,0);opacity: 0.5}';

    document.body.appendChild(sheet);
  },
  replaceVRIcon: function () {
    var sheet = document.createElement('style');
    sheet.innerHTML = '.a-enter-vr-button {background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIwNDhweCIgaGVpZ2h0PSIyMDQ4cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwNDggMjA0OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRpdGxlPm1hc2s8L3RpdGxlPjxjaXJjbGUgb3BhY2l0eT0iMC40IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3g9IjEwMjQiIGN5PSIxMDI0IiByPSI4ODMuNTg4Ii8+PGc+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEwMDMuNDYsODAyLjYwMmwtMjEwLjU5OSw1MTMuODk2aC02Mi4xMDFMNTIxLjA2Miw4MDIuNjAyaC01Ni42OTl2LTcxLjEwMWgyMTkuNTk5djcxLjEwMWgtNzIuODk5bDE1MywzOTAuNTk3aDUuMzk4TDkxOS43Niw4MDIuNjAyaC03NS42di03MS4xMDFoMjEzLjI5OXY3MS4xMDFIMTAwMy40NnoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTQ4My4xNTcsMTMxNi40OThsLTEyMy4zLTIzOC40OTloLTExMS42djE2Ny4zOTloNzMuODAxdjcxLjFIMTA5NS4yNnYtNzEuMWg3MS4xMDFWODAyLjYwMmgtNzEuMTAxdi03MS4xMDFoMjU2LjQ5OWMxNDQuODk4LDAsMjA5LjY5OCw2Ny41LDIwOS42OTgsMTY5LjE5OWMwLDc2LjUtNDQuMSwxMzguNTk5LTEyMS40OTksMTYxLjA5OWw5Ny4xOTksMTgzLjYwMWg3Mi44OTl2NzEuMUwxNDgzLjE1NywxMzE2LjQ5OEwxNDgzLjE1NywxMzE2LjQ5OHogTTEzMzkuMTU4LDgwMi42MDJoLTkwLjg5OXYyMDguNzk4aDkxLjhjOTguMTAxLDAsMTM0LjEtNDAuNSwxMzQuMS0xMDguODk5QzE0NzQuMTU3LDgzMS40MDEsMTQzNi4zNTcsODAyLjYwMiwxMzM5LjE1OCw4MDIuNjAyeiIvPjwvZz48L3N2Zz4=) 100% 100%/100% 100% no-repeat;';
    sheet.innerHTML += 'border: 0;';
    sheet.innerHTML += 'bottom: 0;';
    sheet.innerHTML += 'cursor: pointer;';
    sheet.innerHTML += 'min-width: 40px;';
    sheet.innerHTML += 'min-height: 40px;';
    sheet.innerHTML += 'padding-right: 5%;';
    sheet.innerHTML += 'padding-top: 4%;';
    sheet.innerHTML += 'position: absolute;';
    sheet.innerHTML += 'right: 0;';
    sheet.innerHTML += 'z-index: 9999;';
    sheet.innerHTML += 'margin-right: 5px;}';
    sheet.innerHTML += '.a-enter-vr-button:active,.a-enter-vr-button:hover {background-color: rgba(0,0,0,0);opacity: 0.5}';

    document.body.appendChild(sheet);
  }
});