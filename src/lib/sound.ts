let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

// A soft "old page turning" sound: filtered noise burst with a slow envelope.
export function playPageTurn(): void {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume();

  const duration = 0.6;
  const bufferSize = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    // noise with a swell in the middle
    const env = Math.sin(Math.PI * t);
    data[i] = (Math.random() * 2 - 1) * env * 0.5;
  }

  const noise = audio.createBufferSource();
  noise.buffer = buffer;

  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.6;

  const gain = audio.createGain();
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(0.18, audio.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);

  noise.start();
  noise.stop(audio.currentTime + duration);
}

// A soft low thud for the journal opening.
export function playJournalOpen(): void {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume();

  const osc = audio.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, audio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(60, audio.currentTime + 0.4);

  const gain = audio.createGain();
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(0.12, audio.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.5);

  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.5);
}
