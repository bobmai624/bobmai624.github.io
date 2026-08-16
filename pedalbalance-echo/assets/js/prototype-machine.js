const INITIAL_STATE = Object.freeze({
  state: 'WELCOME',
  safetyAcknowledged: false,
  calibrated: false,
  baselineCaptured: false,
  cueSide: 'none',
  faultCode: null,
  traceProvenance: null
});

const ALLOWED_REPLAY_STATES = new Set(['READY', 'NO_FEEDBACK']);
const ALLOWED_EXPORT_STATES = new Set(['READY', 'NO_FEEDBACK', 'REPLAY', 'STOPPED']);

function eventType(event) {
  return typeof event === 'string' ? event : event?.type;
}

export function createPrototypeMachine() {
  let current = { ...INITIAL_STATE };

  function requireState(expected, type) {
    const valid = Array.isArray(expected) ? expected.includes(current.state) : current.state === expected;
    if (!valid) throw new Error(`${type} is not valid from ${current.state}`);
  }

  function dispatch(event) {
    const type = eventType(event);
    if (!type) throw new Error('Prototype event requires a type');

    if (type === 'RESET') {
      current = { ...INITIAL_STATE };
      return snapshot();
    }
    if (type === 'STOP_OUTPUT') {
      current = { ...current, state: 'STOPPED', cueSide: 'none' };
      return snapshot();
    }
    if (type === 'FAULT') {
      current = {
        ...current,
        state: 'FAULT',
        cueSide: 'none',
        faultCode: event.code || 'UNKNOWN_FAULT'
      };
      return snapshot();
    }

    switch (type) {
      case 'ACK_SAFETY':
        requireState('WELCOME', type);
        current = { ...current, state: 'SAFETY', safetyAcknowledged: true };
        break;
      case 'DISCOVER':
        requireState('SAFETY', type);
        current = { ...current, state: 'DISCOVERY' };
        break;
      case 'DEVICE_READY':
        requireState('DISCOVERY', type);
        current = { ...current, state: 'CALIBRATION' };
        break;
      case 'CALIBRATION_COMPLETE':
        requireState('CALIBRATION', type);
        current = { ...current, state: 'BASELINE', calibrated: true };
        break;
      case 'BASELINE_COMPLETE':
        requireState('BASELINE', type);
        current = { ...current, state: 'READY', baselineCaptured: true };
        break;
      case 'START_TRAINING':
        if (!current.calibrated || !current.baselineCaptured) {
          throw new Error('Training requires calibration and a personal baseline');
        }
        requireState(['READY', 'NO_FEEDBACK'], type);
        current = { ...current, state: 'TRAINING', cueSide: 'none', faultCode: null };
        break;
      case 'SET_CUE': {
        requireState(['TRAINING', 'REPLAY'], type);
        const side = event.side || 'none';
        if (!['left', 'right', 'none'].includes(side)) throw new Error(`Unknown cue side: ${side}`);
        current = { ...current, cueSide: side };
        break;
      }
      case 'END_TRAINING':
        requireState('TRAINING', type);
        current = { ...current, state: 'NO_FEEDBACK', cueSide: 'none' };
        break;
      case 'START_REPLAY':
        if (!current.calibrated || !current.baselineCaptured) {
          throw new Error('Replay requires calibration and a personal baseline');
        }
        if (!ALLOWED_REPLAY_STATES.has(current.state)) throw new Error(`${type} is not valid from ${current.state}`);
        current = {
          ...current,
          state: 'REPLAY',
          cueSide: 'none',
          traceProvenance: event.provenance || 'past_self'
        };
        break;
      case 'END_REPLAY':
        requireState('REPLAY', type);
        current = { ...current, state: 'READY', cueSide: 'none' };
        break;
      case 'ACK_FAULT':
        requireState('FAULT', type);
        current = {
          ...current,
          state: current.calibrated && current.baselineCaptured ? 'READY' : 'DISCOVERY',
          faultCode: null,
          cueSide: 'none'
        };
        break;
      case 'EXPORT':
        if (!ALLOWED_EXPORT_STATES.has(current.state)) throw new Error(`${type} is not valid from ${current.state}`);
        current = { ...current, state: 'EXPORT', cueSide: 'none' };
        break;
      default:
        throw new Error(`Unknown prototype event: ${type}`);
    }
    return snapshot();
  }

  function snapshot() {
    return Object.freeze({ ...current });
  }

  return { dispatch, snapshot };
}
