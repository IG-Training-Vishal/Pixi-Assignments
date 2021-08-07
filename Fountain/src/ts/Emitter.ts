import { ParticleContainer } from 'pixi.js';
import particles = require('pixi-particles');
// import { getSmily } from './Textures';

export class Emitter extends ParticleContainer {
  private pEmitter: particles.Emitter;

  constructor(maxCount: number, props?:any) {
    super(maxCount, props);
    this.pEmitter = new particles.Emitter(this,
      // [getSmily()],
      ["./assets/img/coin2.png"],
      {
        "alpha": {
          "start": 1,
          "end": 0.51
        },
        "scale": {
          "start": 0.5,
          "end": 0.3
        },
        // "color": {
        //   "start": "ffffff",
        //   "end": "9ff3ff"
        // },
        "speed": {
          "start": 600,
          "end": 200
        },
        "acceleration": {
          "x":0,
          "y": 2000
        },
        "startRotation": {
          "min": 260,
          "max": 280
        },
        "rotationSpeed": {
          "min": 0,
          "max": 0
        },
        "lifetime": {
          "min": 0.25,
          "max": 0.5
        },
        "blendMode": "normal",
        "frequency": 0.0110,
        "emitterLifetime": 0,
        "maxParticles": 100,
        "pos": {
          "x": 10,
          "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
          "x": 0,
          "y": 0,
          "r": 0
        },
      });
  }

  public start(): void {
    this.pEmitter.emit = true;
  }

  public update(delta: number): void {
    this.pEmitter.update(delta * 0.001);
  }
}
