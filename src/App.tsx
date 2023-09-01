import './App.css';
import { useState } from 'react';
import React from 'react';
import { Music, ScaleName, Note, scaleNames } from './utils/music'

function App() {
  const [scaleName, setScaleName] = useState(ScaleName.Major)
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
  const keys = [
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

  const keyValues = {'C': 0, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'Gb': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb' : 10, 'B': 11};
  // const getNoteInfo = (note) => {
  //   let noteName
  //   let octaveNumber = 1
  //   const firstNoteValue = keyValues[currentScale.notes[0]]
  //   let numberedNoteName;
  //   for(let index = 0; index++; index < currentScale.notes.length){
  //       noteName = currentScale.notes[index]
        
  //       if(octaveNumber === 1 && index !== 0 && keyValues[noteName] <= firstNoteValue){
  //           octaveNumber += 1
  //       }
  //       numberedNoteName = noteName + "_" + octaveNumber
  //       if(note === numberedNoteName){
  //           return {
  //               inScale: true,
  //               index: index
  //           }
  //       }
  //   }
  //   return {
  //       inScale: false,
  //       index: -1
  //   }
  // };

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

  console.log(colorClasses[0])

  return (
    <div className="App">
        <div className="keys block w-full h-96 max-w-4xl relative mx-auto mt-10 mb-0 [&>*:first-child]:border-l-2">
          {keys.map((key, index) => {
            return (
            <div className={
                "border-2 border-solid border-l-0 block border-black rounded-md " +
                (key.sharp ?
                  "border-l-2 absolute w-[calc(300%/70)] h-3/5 top-0 bg-black z-10 " + key.left + " " :
                  " relative float-left w-[calc(100%/14)] h-full z-0 "
                ) + ((notesOfScale.indexOf(key.noteName) >= 0) ? colorClasses[notesOfScale.indexOf(key.noteName)] : "")
              }>
              <div className={"w-full text-center absolute bottom-2 " +
              (key.sharp ? "text-white" : "")
              }>{key.noteName}</div>
            </div>
          )})}
        </div>
        <div className="get-random-scale my-0 mx-auto w-full flex justify-evenly max-w-4xl">
            <div className="scale flex-1 mt-3">
                <div className="scale-title mode-title border-b-2 mb-3 pb-3">Scale</div>
                <div className="scale-name text-xl">{Note[noteIndex]} {ScaleName[scaleName]}</div>
            </div>
            <button className="
              get-scale flex-1 m-4 py-4 text-2xl bg-ff5b3d border-4 bg-scarlett-500 border-scarlett-200 text-white
              hover:bg-white hover:text-scarlett-500 hover:border-scarlett-600 active:bg-scarlett-700 active:text-white active:border-scarlett-600">Get Random Scale</button>
            <div className="mode flex-1 mt-3">
                <div className="mode-title border-b-2 mb-3 pb-3">Mode</div>
                <div className="mode-name text-xl">{scaleNames[scaleName][modeIndex]}</div>
            </div>
        </div>
        <div>
            <label
                htmlFor="default-range"
                className="block mb-2 text-sm font-medium text-gray-900">
                Scale
            </label>
            <input
                id="default-range"
                type="range"
                value={scaleName}
                onChange={onChangeScale}
                min={ScaleName.Chromatic}
                max={ScaleName.Blues}
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>
        <div>
            <label
                htmlFor="default-range"
                className="block mb-2 text-sm font-medium text-gray-900">
                Mode
            </label>
            <input
                id="default-range"
                type="range"
                value={modeIndex}
                onChange={(event) => (setModeIndex(parseInt(event.target.value) as ScaleName))}
                min={0}
                max={scaleNames[scaleName].length - 1}
                disabled={scaleNames[scaleName].length < 2}
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>
        <div>
            <label
                htmlFor="default-range"
                className="block mb-2 text-sm font-medium text-gray-900">
                Key
            </label>
            <input
                id="default-range"
                type="range"
                value={noteIndex}
                onChange={(event) => (setNoteIndex(parseInt(event.target.value) as Note))}
                min={Note.C}
                max={Note.Bb}
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>
    </div>
  );
}

export default App;
