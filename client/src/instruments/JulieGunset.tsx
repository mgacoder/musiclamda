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

interface ThereminPositionProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function ThereminPosition({
  note,
  synth,
  minor,
  index,
}: ThereminPositionProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `ThereminPositionWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseEnter={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseLeave={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {

      })}
      style={{
        // CSS
        // changed to make the boxes horizontal
        // theramin is played by waving your hand above it
        // the closer down your hand, the higher-pitched the note

        top:  `${index * 0.25}rem`,
        left: 0,
        right: 80,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }}
    ></div>
  );
}

// eslint-disable-next-line
function ThereminPositionWithoutJSX({
  note,
  synth,
  minor,
  index,
}: ThereminPositionProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `ThereminPosition` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseEnter: () => synth?.triggerAttack(`${note}`),
      onMouseLeave: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top:  `${index}rem`,
        left: 0,
      },
    },
    [],
  );
}

function PianoType({ title, onClick, active }: any): JSX.Element {
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

function Theremin({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([

   
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },

    /**
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0 },
    { note: 'D', idx: 0 },
    { note: 'Eb', idx: 0 },
    { note: 'E', idx: 0 },
    { note: 'F', idx: 0 },
    { note: 'Gb', idx: 0 },
    { note: 'G', idx: 0 },
    { note: 'Ab', idx: 0 },
    { note: 'A', idx: 0 },
    { note: 'Bb', idx: 0 },
    { note: 'B', idx: 0 },
    */
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
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <ThereminPosition
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <PianoType
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

export const ThereminInstrument = new Instrument('Theremin', Theremin);
