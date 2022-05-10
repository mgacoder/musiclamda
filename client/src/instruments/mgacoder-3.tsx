// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface XylophoneKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  index: number; // octave + index together give a location for the piano key
  color: string;
  height: string;
  top: string
 
}

export function XylophoneKey({
  note,
  synth,
  minor,
  index,
  height,
  color,
  top
}: XylophoneKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    

      <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
            onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
            className={classNames('ba pointer absolute dim', {
              'bg-black black h3': minor, // minor keys are black
              'black bg-white h4': !minor, // major keys are white
            })}
            style={{
              // CSS
              top: top,
              left: `${index * 2}rem`,
              zIndex: minor ? 1 : 0,
              width: minor ? '1.5rem' : '2rem',
              height: height,
              marginLeft: '0.25rem',
              backgroundColor: color,
              borderRadius: 10,
              right:'2rem'
              
            }}
          ></div>
    
   
  );
}

// // eslint-disable-next-line
// function XylophoneKeyWithoutJSX({
//   note,
//   synth,
//   minor,
//   index,
// }: XylophoneKeyProps): JSX.Element {
//   /**
//    * This React component for pedagogical purposes.
//    * See `PianoKey` for the React component with JSX (JavaScript XML).
//    */
//   return React.createElement(
//     'div',
//     {
//       onMouseDown: () => synth?.triggerAttack(`${note}`),
//       onMouseUp: () => synth?.triggerRelease('+0.25'),
//       className: classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor,
//         'black bg-white h4': !minor,
//       }),
//       style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       },
//     },
//     [],
//   );
// }

function XylophoneType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Xylophone({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([   

    { note: 'C5', idx: 0, height: '250px', color: 'red', top: '0px'       },
    { note: 'D5', idx: 1, height: '225px', color: 'orange', top: '12px'   },
    { note: 'E5', idx: 2, height: '200px', color: 'yellow', top: '24px'   },
    { note: 'F5', idx: 3, height: '175px', color: 'green', top: '36px'    },
    { note: 'G5', idx: 4, height: '150px', color: 'blue', top: '48px'     },
    { note: 'A5', idx: 5, height: '125px', color: 'lightblue', top: '60px'},
    { note: 'B5', idx: 6, height: '100px', color: 'purple', top: '72px'   },
    { note: 'C6', idx: 7, height: '75px' , color: 'pink', top: '84px'     }
    

    
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4"
        style={{
          height:250,
        }}
      >
        
          {keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}`;
            return (

              
              
              <XylophoneKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                index={key.idx}
                color={key.color}
                height={key.height}
                top={key.top}
                
              />



            );
          })}
        
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <XylophoneType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const XylophoneInstrument = new Instrument('Xylophone-mgacoder', Xylophone);