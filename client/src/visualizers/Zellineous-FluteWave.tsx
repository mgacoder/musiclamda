// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';

function Flute(p5: P5, analyzer: Tone.Analyser) {
  const width = window.innerWidth;
  const height = window.innerHeight / 2;
  const dim = Math.min(width, height);
  const colors = ['red']

  p5.background('black');

  p5.strokeWeight(dim * 0.01);

  const values = analyzer.getValue();
  p5.beginShape();

  for (let j = 0; j < colors.length; j++) {
    p5.translate(240, 0, 0);
    p5.push()
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.stroke(colors[j]);
    p5.fill(colors[j]);
    p5.pop()
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      p5.torus(amplitude*300, amplitude*200);
    }
  }

  p5.endShape();
}

export const FluteWaveV = new Visualizer('Flutewave', Flute);