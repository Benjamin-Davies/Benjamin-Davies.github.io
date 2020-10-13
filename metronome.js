import { registerSW } from './shared.js';

registerSW();

// E6
const highFreq = 440 * 6;
// A6
const lowFreq = 440 * 4;
// Time to preschedule beeps ahead of the current time
const preschedule = 5;

// Number of beats
let timeSignature = 4;
// Tempo in bpm
let tempo = 120;

// Use a basic three value envelope
// Attack value for envelope
const attack = 0.01;
// Sustain value for envelope
const hold = 0.05;
// Release value for envelope
const release = 0.01;

const timeSignatureInput = document.getElementById('timeSignature');
timeSignatureInput.value = timeSignature;
timeSignatureInput.addEventListener('change', () => {
  timeSignature = +timeSignatureInput.value;
  reschedule();
});

const tempoInput = document.getElementById('tempo');
tempoInput.value = tempo;
tempoInput.addEventListener('change', () => {
  tempo = +tempoInput.value;
  reschedule();
});

const volumeInput = document.getElementById('volume');
volumeInput.addEventListener('mousemove', () => {
  volume.gain.linearRampToValueAtTime(+volumeInput.value, ctx.currentTime + attack);
});

const ctx = new AudioContext();
const highOsc = ctx.createOscillator();
highOsc.frequency.value = highFreq;
highOsc.type = 'sine';
highOsc.start();
const highEnvelope = ctx.createGain();
highEnvelope.gain.value = 0;
highOsc.connect(highEnvelope);

const lowOsc = ctx.createOscillator();
lowOsc.frequency.value = lowFreq;
lowOsc.type = 'sine';
lowOsc.start();
const lowEnvelope = ctx.createGain();
lowEnvelope.gain.value = 0;
lowOsc.connect(lowEnvelope);

const volume = ctx.createGain();
volume.gain.value = 0.7;
volume.gain.linearRampToValueAtTime(1, 1);
highEnvelope.connect(volume);
lowEnvelope.connect(volume);
volume.connect(ctx.destination);

function scheduleBeep(envelope, t) {
  envelope.gain.linearRampToValueAtTime(0, t);
  t += attack;
  envelope.gain.linearRampToValueAtTime(1, t);
  t += hold;
  envelope.gain.linearRampToValueAtTime(1, t);
  t += release;
  envelope.gain.linearRampToValueAtTime(0, t);
}

let scheduleAt = 0;
let beat = 1;

function schedule() {
  const beatDelay = 60 / tempo;
  if (scheduleAt < ctx.currentTime) {
    scheduleAt = ctx.currentTime + hold;
  }
  while (scheduleAt < ctx.currentTime + preschedule) {
    if (beat === 0) {
      scheduleBeep(highEnvelope, scheduleAt);
    } else {
      scheduleBeep(lowEnvelope, scheduleAt);
    }
    scheduleAt += beatDelay;
    beat++;
    if (beat >= timeSignature) {
      beat = 0;
    }
  }
}

function reschedule() {
  highEnvelope.gain.cancelScheduledValues(ctx.currentTime);
  highEnvelope.gain.linearRampToValueAtTime(0, ctx.currentTime + release);
  lowEnvelope.gain.cancelScheduledValues(ctx.currentTime);
  lowEnvelope.gain.linearRampToValueAtTime(0, ctx.currentTime + release);
  scheduleAt = 0;
  beat = 0;
  schedule();
}

schedule();
setInterval(schedule, 1000);
