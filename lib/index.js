import './css/index.css';
import {EarthEngine} from './js/earth';

const canvas = document.createElement('canvas');
const engine = new EarthEngine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});
engine.start();
engine.resize();
document.body.appendChild(canvas);
window.addEventListener('resize', function() {
  engine.resize();
});
