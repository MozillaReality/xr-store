AFRAME.registerComponent('orbit-controls', {
  dependencies: ['camera'],
  schema: {
    position: {default: { x: 0, y: 2, z: -2 }, type: 'vec3'}
  },

  init: function () {
    var sceneEl = this.el.sceneEl;
    var setupControls = this.setupControls.bind(this);
    if (!this.el.sceneEl.is('vr-mode')) {
      this.el.setAttribute('position', this.data.position);
    }
    if (!sceneEl.canvas) {
      sceneEl.addEventListener('render-target-loaded', setupControls);
    } else {
      setupControls();
    }
    // this.targetObj = document.querySelector('#mainMesh').object3D;
    this.onEnterVR = this.onEnterVR.bind(this);
    this.onExitVR = this.onExitVR.bind(this);
    sceneEl.addEventListener('enter-vr', this.onEnterVR);
    sceneEl.addEventListener('exit-vr', this.onExitVR);
  },

  onExitVR: function () {
    this.el.setAttribute('position', this.data.position);
    this.controls.enabled = true;
  },

  onEnterVR: function () {
    if (!AFRAME.utils.device.checkHeadsetConnected() && !this.el.sceneEl.isMobile) {return; }

    var currentPosition = this.el.getAttribute('position');
    var camera = this.el.getObject3D('camera');
    this.controls.enabled = false;
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    if (this.el.sceneEl.isMobile) { return; }
    this.el.setAttribute('position', {
      x: currentPosition.x - this.data.position.x,
      y: currentPosition.y - this.data.position.y,
      z: currentPosition.z - this.data.position.z
    });

  },
  
  tick: function () {
    if (this.controls.enabled) {
      this.controls.update();
    }
  },

  setupControls: function() {
    var renderer = this.el.sceneEl.renderer;
    var camera = this.el.getObject3D('camera');
    var controls = this.controls = new THREE.OrbitControls(camera, renderer.domElement);
    var position = this.el.getAttribute('position');
    controls.target.setX(-position.x);
    controls.target.setY(-position.y/1.75);
    controls.target.setZ(-position.z);
    // controls.minAzimuthAngle = -Math.PI/4;
    // controls.maxAzimuthAngle = Math.PI/4;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.1;
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 3;
  },

  play: function () {
    if (!this.controls) { return; }
    this.controls.enabled = true;
  },

  pause: function () {
    if (!this.controls) { return; }
    this.controls.enabled = false;
  },

  remove: function () {
    this.pause();
  }
});
