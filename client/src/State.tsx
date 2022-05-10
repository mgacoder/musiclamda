// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { LonnieC11 } from './instruments/dcastrolopez';
import { dcastrolopezVisualizer } from './visualizers/dcastrolopezVisualizer';

import { XylophoneInstrument } from './instruments/mgacoder-3';
import { ShapeVisualizer } from './visualizers/mgacoder-3';

import { ThereminInstrument } from './instruments/JulieGunset';
import { ChaosVisualizer } from './visualizers/JulieGunset';

import { FluteWaveV } from './visualizers/Zellineous-FluteWave';
import { FluteInstrument } from "./instruments/Zellineous-Flute";


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, XylophoneInstrument, ThereminInstrument, LonnieC11, FluteInstrument]);       // similar to Instrument[]




/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, ShapeVisualizer, ChaosVisualizer, dcastrolopezVisualizer, FluteWaveV]);    // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});
