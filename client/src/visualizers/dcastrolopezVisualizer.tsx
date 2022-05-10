// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const dcastrolopezVisualizer = new Visualizer(
  'dcastrolopez',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height); 
    
    // p5.background(147,112,219, 255); // Purple Background
    p5.background(170, 51, 106,255); // Pink Background
    // p5.strokeWeight(dim * 0.01);    // Normal Small Stroke
    p5.strokeWeight(dim * 0.025);       // Testing Stroke Size
    p5.stroke(255, 253, 208, 255);     // Pink Stroke Color 
    // p5.stroke(147,112,219, 255);     // Purple Stroke Color 
    p5.fill(208, 78, 47, 255);        // Turquoise Fill 
    // p5.noFill();
    
    p5.translate(width/2, height/2);   // translates image to center of screen 

    const values = analyzer.getValue(); 
   
        // Particle 1
        p5.beginShape();
        for (let i = 0; i < values.length; i++) {
          var index = p5.floor(p5.map(i, 0 , 180, 0, width));
          var r = p5.map(values[index] as number * 15, -1,1,100,350); // multiplying allows for
          var x = r * Math.sin(i);
          var y = r * Math.cos(i);
          // Place vertex
          p5.circle(x, y, 5);
      
        }
        p5.endShape();

         // Particle 2
        p5.beginShape();
        for (let i = 0; i < values.length; i++) {
           index = p5.floor(p5.map(i, 0 , 180, 0, width));
           r = p5.map(values[index] as number * 20, -1,1,200,350); // multiplying allows for
      
           x = r * Math.sin(i);
           y = r * Math.cos(i);
          // Place vertex
          p5.circle(x, y, 5);
      
        }
        p5.endShape();

         // Particle 3
        p5.beginShape();
        for (let i = 0; i < values.length; i++) {
           index = p5.floor(p5.map(i, 0 , 180, 0, width));
           r = p5.map(values[index] as number * 25, -1,1,100,350); // multiplying allows for
       
           x = r * Math.sin(i);
           y = r * Math.cos(i);
          // Place vertex
          p5.circle(x, y, 5);
      
        }
        p5.endShape();


    // Center Visualizer
    p5.beginShape();
    for (let i = 0; i <= 180; i++) { 
       index = p5.floor(p5.map(i, 0 , 180, 0, width));
       r = p5.map(values[index] as number * 10, -1,1,150,350); // multiplying allows for
       x = r * Math.sin(i);
       y = r * Math.cos(i);
   
      // Place vertex
      p5.vertex(x, y);
   
    }
    p5.endShape();

  },

);