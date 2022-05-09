// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const ShapeVisualizer = new Visualizer(

  'Shapes',

  (p5: P5, analyzer: Tone.Analyser) => {
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    p5.background(0);
    p5.stroke(p5.random(0,255), p5.random(0,255), p5.random(0,255), p5.random(0,255))
    p5.strokeWeight(5);
    const values = analyzer.getValue();

    for (let i = 0; i < values.length; i++){
      const x = Math.ceil(p5.map(i, 0, values.length - 1, 0, width)/100);
      p5.translate(580, 200);
      const amplitude = values[i] as number;
      const p1x = width/2.6;
      const p1y = 100;
      const p2x = 100;
      const p2y = height;
      //const p3x = width/1.3;
      //const p3y = height;
      p5.fill(p5.random(i),p5.random(i),p5.random(i), p5.random(i));
      p5.rect(15*p1x*amplitude,15*p1y*amplitude,15*p2x*amplitude,15*p2y*amplitude);
      //p5.triangle(15*p1x*amplitude,15*p1y*amplitude,15*p2x*amplitude,15*p2y*amplitude,15*p3x*amplitude,15*p3y*amplitude)
      //p5.circle(15*p1x*amplitude,15*p1y*amplitude, 15*p2y*amplitude);
      p5.rotate(Math.PI/30)

    }  
  },
);
