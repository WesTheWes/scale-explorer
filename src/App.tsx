import './App.css';
import { useState } from 'react';
import React from 'react';
import { Music, ScaleName, Note, scaleNames, scaleStructures } from './utils/music'
import Select from './components/select';

function App() {
  const [scaleName, setScaleName] = useState(ScaleName["Diatonic Major"])
  const [modeIndex, setModeIndex] = useState(0)
  const [noteIndex, setNoteIndex] = useState(Note.C)

  const music = new Music(scaleName, modeIndex, noteIndex)
  const notesOfScale = music.getNotesOfScale();

  const onChangeScale = (event: React.FormEvent<HTMLInputElement>) => {
    const newScaleName = parseInt(event.currentTarget.value) as ScaleName
    setScaleName(newScaleName)
    if(modeIndex >= scaleNames[newScaleName].length){
      setModeIndex(scaleNames[newScaleName].length - 1)
    }
  }

  const getRandomScale = () => {
    const keys : string[] = Object.keys(ScaleName).filter((key) => Number(key) >= 0);
    const scaleIndex : number = Math.floor(Math.random() * keys.length)
    const newScaleIndex = keys[scaleIndex]
    const newScaleName: ScaleName = parseInt(newScaleIndex)
    const modesLength = scaleNames[newScaleName].length
    const newModeIndex = Math.floor(Math.random() * modesLength)
    const newNoteIndex = Math.floor(Math.random() * Note.B)
    setScaleName(parseInt(newScaleIndex))
    setModeIndex(newModeIndex)
    setNoteIndex(newNoteIndex)
  }

  const addNumberSuffix = (number: number) => {
    if (number % 10 === 1 && number % 100 !== 11) {
      return number + "st";
    } else if (number % 10 === 2 && number % 100 !== 12) {
      return number + "nd";
    } else if (number % 10 === 3 && number % 100 !== 13) {
      return number + "rd";
    } else {
      return number + "th";
    }
  }

  const colorClasses : {[key: number] : string} = {
    0 : 'bg-note-0',
    1 : 'bg-note-1',
    2 : 'bg-note-2',
    3 : 'bg-note-3',
    4 : 'bg-note-4',
    5 : 'bg-note-5',
    6 : 'bg-note-6',
    7 : 'bg-note-7',
    8 : 'bg-note-8',
    9 : 'bg-note-9',
    10: 'bg-note-10',
    11: 'bg-note-11',
    12: 'bg-note-12',
  }

  const keys : Array<{note: string, sharp:boolean, noteName: string, left?:string}> = [
    {note: 'C_1', sharp: false, noteName: 'C'},
    {note: 'Db_1', sharp: true, noteName: 'Db', left: "left-[calc(70%/14)]"},
    {note: 'D_1', sharp: false, noteName: 'D'},
    {note: 'Eb_1', sharp: true, noteName: 'Eb', left: "left-[calc(170%/14)]"},
    {note: 'E_1', sharp: false, noteName: 'E'},
    {note: 'F_1', sharp: false, noteName: 'F'},
    {note: 'Gb_1', sharp: true, noteName: 'Gb', left: "left-[calc(370%/14)]"},
    {note: 'G_1', sharp: false, noteName: 'G'},
    {note: 'Ab_1', sharp: true, noteName: 'Ab', left: "left-[calc(470%/14)]"},
    {note: 'A_1', sharp: false, noteName: 'A'},
    {note: 'Bb_1', sharp: true, noteName: 'Bb', left: "left-[calc(570%/14)]"},
    {note: 'B_1', sharp: false, noteName: 'B'},
    {note: 'C_2', sharp: false, noteName: 'C'},
    {note: 'Db_2', sharp: true, noteName: 'Db', left: "left-[calc(770%/14)]"},
    {note: 'D_2', sharp: false, noteName: 'D'},
    {note: 'Eb_2', sharp: true, noteName: 'Eb', left: "left-[calc(870%/14)]"},
    {note: 'E_2', sharp: false, noteName: 'E'},
    {note: 'F_2', sharp: false, noteName: 'F'},
    {note: 'Gb_2', sharp: true, noteName: 'Gb', left: "left-[calc(1070%/14)]"},
    {note: 'G_2', sharp: false, noteName: 'G'},
    {note: 'Ab_2', sharp: true, noteName: 'Ab', left: "left-[calc(1170%/14)]"},
    {note: 'A_2', sharp: false, noteName: 'A'},
    {note: 'Bb_2', sharp: true, noteName: 'Bb', left: "left-[calc(1270%/14)]"},
    {note: 'B_2', sharp: false, noteName: 'B'},
  ];

  const noteOffsets : {[key:string]: number} = {
    'C_1': 0,
    'Db_1': 1,
    'D_1': 2,
    'Eb_1': 3,
    'E_1': 4,
    'F_1': 5,
    'Gb_1': 6,
    'G_1': 7,
    'Ab_1': 8,
    'A_1': 9,
    'Bb_1': 10,
    'B_1': 11,
    'C_2': 12,
    'Db_2': 13,
    'D_2': 14,
    'Eb_2': 15,
    'E_2': 16,
    'F_2': 17,
    'Gb_2': 18,
    'G_2': 19,
    'Ab_2': 20,
    'A_2': 21,
    'Bb_2': 22,
    'B_2': 23,
};

  const audioContext = new (window.AudioContext)();

// Function to create an oscillator for a given note
function createOscillator(note:any) {
    const attackTime = 0.03
    const decayTime = 0.02
    const sustainLevel = 1
    const releaseTime = 0.1
    const oscillator = audioContext.createOscillator()
    const now = audioContext.currentTime
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(noteToFrequency(note), now);
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    gainNode.gain.setValueAtTime(sustainLevel, now + attackTime + decayTime + releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, now + attackTime + decayTime + releaseTime + 0.1);
    // Create a low-pass filter
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass'; // You can adjust the filter type
    filter.frequency.value = 1700; // Adjust the cutoff frequency as needed

    oscillator.connect(gainNode);
    gainNode.connect(filter)
    filter.connect(audioContext.destination);
    return oscillator;
}

// Function to convert a note to a frequency
function noteToFrequency(note:any) {
    const A4Frequency = 220; // The frequency of A4 (440 Hz)
    const semitoneRatio = Math.pow(2, 1 / 12);
    const distanceFromA4 = noteOffsets[note] - noteOffsets['A_1'];
    return A4Frequency * Math.pow(semitoneRatio, distanceFromA4);
}

function playNote(note:any){
  const oscillator = createOscillator(note);
  oscillator.start();
  oscillator.stop(audioContext.currentTime+10);
}

  return (
    <div className="App bg-gradient-to-br from-pink-300 to-blue-300 h-screen">
      <header className="p-8">
          <h1 className="text-3xl md:text-5xl text-white tracking-wide">Scale Explorer</h1>
          <p className="text-lg font-semibold mt-2"></p>
      </header>
      <div className="my-0 mx-auto w-full flex space-x-4 justify-evenly max-w-4xl">
        <Select value={scaleName} options={music.getAllScales()} title="Tonality" onChange={onChangeScale}></Select>
        <Select value={modeIndex} options={scaleNames[scaleName].map((mode, index) => `${addNumberSuffix(index+1)}: ${mode}`)} title="Mode" onChange={(event:any) => (setModeIndex(parseInt(event.target.value)))}></Select>
        <Select value={noteIndex} options={music.getAllNotes()} title="Starting Note" onChange={(event:any) => (setNoteIndex(parseInt(event.target.value) as Note))}></Select>
      </div>
      <div className="w-full px-3 md:px-0">
        <div className="keys block w-full h-48 md:h-80 max-w-4xl relative mx-auto mt-10 mb-0 [&>*:first-child]:border-l ">
          {keys.map((key, index) => {
            const shouldColor = (index >= noteIndex && index <= noteIndex + 12) && (notesOfScale.indexOf(key.noteName) >= 0)
            return (
              <div className={
                "rounded-t-none transition-all duration-200 border-r border-b border-t border-solid border-slate-950 rounded-b-sm md:rounded-b-md hover:bg-pink-600 " +
                (key.sharp ?
                  " border-l absolute w-[calc(300%/70)] h-3/5 top-0 z-10 " + key.left + " " :
                  " relative float-left w-[calc(100%/14)] h-full z-0 "
                ) + (shouldColor ? colorClasses[notesOfScale.indexOf(key.noteName)] : (key.sharp ? "bg-slate-950" : "bg-white"))}
                  onClick={() => playNote(key.note)}
              >
              <div className={"w-full text-center absolute bottom-2 text-[8px] md:text-sm " +
              (key.sharp ? "text-white" : "")
              }>{key.noteName}</div>
            </div>
          )})}
        </div>
      </div>
      <div className="get-random-scale my-0 mx-auto w-full flex justify-evenly max-w-4xl text-slate-950 px-3 md:px-0">
        <div className="mode flex-1 mt-3">
              <div className="mode-title border-b mb-3 pb-3 border-slate-700">Scale</div>
              <div className="mode-name text-xl font-bold">{Note[noteIndex]} {scaleNames[scaleName][modeIndex]}</div>
          </div>
          <button className="
            w-1/4 my-6 mx-3 h-12 md:h-auto p-0 md:py-4 md:text-2xl bg-ff5b3d border-4 bg-scarlett-500 border-scarlett-600 text-white
            hover:bg-pink-50 hover:text-scarlett-500 hover:border-scarlett-600 active:bg-scarlett-700 active:text-white active:border-scarlett-600"
            onClick={getRandomScale}
            >Randomize</button>
          <div className="scale flex-1 mt-3 ">
              <div className="scale-title mode-title border-b mb-3 pb-3 border-slate-700">{addNumberSuffix(modeIndex+1)} Mode of the</div>
              <div className="scale-name text-xl font-bold">{music.getOriginalKey()} {ScaleName[scaleName]} Scale</div>
          </div>
      </div>
    </div>
  );
}

export default App;
