// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import { ScaleExp } from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const ChaosVisualizer = new Visualizer(
  'Chaos-JulieGunset',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(255, 255, 255, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(0, 128, 128, 255);
    p5.noFill();

    const values = analyzer.getValue();
    // var num : number = values[ 0 ] as number;
    // var color = Math.ceil( Number( String( num * 1000000000 ).slice( 0, 3 ) ) / 4 );
    // var color1 = Math.ceil( Number( String( num * 1000000000 ).slice( 3, 6 ) ) / 4 );
    // var color2 = Math.ceil( Number( String( num * 1000000000 ).slice( 6, 9 ) ) / 4 );
    // p5.stroke(color, color1, color2, 255);
    p5.beginShape();
    
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;
      // Place vertex
      //this isnt working
      //setTimeout(() => {console.log("Don't give anyone a seizure."); }, 1000);
      p5.vertex(x, y);
      p5.vertex(y, x);
      p5.vertex(-x, -y);
      p5.vertex(-y, -x);
      //p5.vertex(x * x, y * y);
      //p5.vertex( 1 / x, 1 / y);
      //p5.stroke((x * 123456789007) % 255, (x * y * 255) % 255, (x / y * 255) % 255, 255)
    }
    p5.endShape();
  },
);