type ScaleMode = {
  scale: string,
  modeName: string,
  notes: string[],
  key: string,
}

export enum ScaleName {
  "Chromatic" = 0,
  "Diatonic Major",
  "Harmonic Minor",
  "Melodic Minor",
  "Harmonic Major",
  "Blues",
}

export enum Note {
  "C" = 0,
  "Db" = 1,
  "D" = 2,
  "Eb" = 3,
  "E" = 4,
  "F" = 5,
  "Gb" = 6,
  "G" = 7,
  "Ab" = 8,
  "A" = 9,
  "Bb" = 10,
  "B" = 11,
}

type ScaleStructure = number[]

type ScaleStructureList = {
  [key in ScaleName] : ScaleStructure
}

type ScaleNameList = {
  [key in ScaleName] : string[]
}

type ScaleModeNameMap = string[]

export const notes : string[] = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
export const scaleStructures : ScaleStructureList = {
  [ScaleName.Chromatic] : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [ScaleName["Diatonic Major"]] : [2, 2, 1, 2, 2, 2, 1],
  [ScaleName["Harmonic Minor"]] : [2, 1, 2, 2, 1, 3, 1],
  [ScaleName["Melodic Minor"]] : [2, 1, 2, 2, 2, 2, 1],
  [ScaleName["Harmonic Major"]] : [2, 2, 1, 2, 1, 3, 1],
  [ScaleName.Blues] : [3, 2, 1, 1, 3, 2],
}
export const scaleNames : ScaleNameList = {
  [ScaleName.Chromatic] : ["Chromatic"],
  [ScaleName["Diatonic Major"]] : ["Ionion (Major)", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aolian (Natural Minor)", "Locrian"],
  [ScaleName["Harmonic Minor"]] : ["Harmonic Minor", "Locrian Natural 6", "Ionion ♯5", "Dorian ♯4", "Phrygian Dominant", "Lydian ♯2", "Altered Diminished (Super Locrian ♭♭7)"],
  [ScaleName["Melodic Minor"]] : ["Melodic Minor", "Dorian ♭2", "Lydian ♯5", "Lydian Dominant", "Mixolydian ♭6", "Aeolian ♭5", "Altered Dominant (Super Locrian)"],
  [ScaleName["Harmonic Major"]] : ["Harmonic Major", "Dorian ♭5", "Phrygian ♭4", "Melodic Minor ♯4", "Mixolydian ♭2", "Lydian Augmented ♯2", "Locrian ♭♭7"],
  [ScaleName.Blues] : ["Blues"],
}

export class Music {
  scaleName: ScaleName
  modeIndex: number
  key: Note
  constructor(scaleName: ScaleName, modeIndex: number, key: Note) {
    this.scaleName = scaleName
    this.modeIndex = modeIndex
    this.key = key
  }

  getNotesOfScale = (): string[] => {
    const scaleStructure : ScaleStructure = scaleStructures[this.scaleName]
    const rotatedNotes = notes.slice(this.key).concat(notes.slice(0, this.key))
    const rotatedScaleStructure = scaleStructure.slice(this.modeIndex).concat(scaleStructure.slice(0, this.modeIndex))
    let notesInScale: string[] = []
    let noteIndex = 0
    let structureIndex = 0;
    while(notesInScale.length < rotatedScaleStructure.length){
      notesInScale.push(rotatedNotes[noteIndex])
      noteIndex += rotatedScaleStructure[structureIndex]
      structureIndex++
    }
    return notesInScale
  }

  getOriginalKey = () : string => {
    let noteIndex = this.key;
    let stepsDown = scaleStructures[this.scaleName].slice(0,this.modeIndex).reduce((totalSteps, step) => totalSteps + step, 0)
    if((noteIndex - stepsDown) < 0){
      stepsDown -= 12
    }
    return Note[noteIndex - stepsDown]
  }

  getAllNotes() : Array<string|Note> {
    return Object.values(Note).filter((note) => isNaN(Number(note)))
  }
  getAllScales() : Array<string|ScaleName> {
    return Object.values(ScaleName).filter((note) => isNaN(Number(note)))
  }
}
