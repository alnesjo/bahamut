import * as BABYLON from '@babylonjs/core';
import diffuse from '../img/world.200405.3x2700x1350.webp';
import displacement from '../img/gebco_08_rev_elev_5400x2700.webp';

export class EarthEngine extends BABYLON.Engine {
  constructor(canvasOrContext, antialias, options, adaptToDeviceRatio) {
    super(canvasOrContext, antialias, options, adaptToDeviceRatio);
    this.scene = new EarthScene(this);
    const camera = new BABYLON.ArcRotateCamera(
      'c1',
      0,
      0,
      100,
      BABYLON.Vector3.Zero(),
      this.scene,
    );
    camera.attachControl(canvasOrContext, true);
  }

  start() {
    this.runRenderLoop(() => this.scene.render());
  }

  stop() {
    this.stopRenderLoop(() => this.scene.render());
  }
}

export class EarthScene extends BABYLON.Scene {
  constructor(engine, options) {
    super(engine, options);
    new AmbientLight('l1', BABYLON.Vector3.Up(), this);
    new EarthMesh('m1', this);
  }
}

export class AmbientLight extends BABYLON.HemisphericLight {
  constructor(name, direction, scene) {
    super(name, direction, scene);
    this.diffuse = BABYLON.Color3.White();
    this.specular = BABYLON.Color3.Black();
    this.groundColor = BABYLON.Color3.White();
  }
}

export class EarthMesh extends BABYLON.Mesh {
  constructor(name, scene, parent) {
    const source = BABYLON.Mesh.CreateSphere(null, 100, 100, null, true);
    super(name, scene, parent, source);
    scene.removeMesh(source);
    this.material = new EarthMaterial('s1', scene);
    this.scaling.x = -1;
    this.applyDisplacementMap(displacement, 0, 1);
  }
}

export class EarthMaterial extends BABYLON.StandardMaterial {
  constructor(name, scene, doNotAdd) {
    super(name, scene, doNotAdd);
    this.diffuseTexture = new BABYLON.Texture(diffuse, scene, false, false);
  }
}
