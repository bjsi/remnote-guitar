export enum LogLevel {
  /**
   * No logging
   */
  None = 0,
  /**
   * Debug level (internal details are displayed).
   */
  Debug = 1,
  /**
   * Info level (only important details are shown)
   */
  Info = 2,
  /**
   * Warning level
   */
  Warning = 3,
  /**
   * Error level.
   */
  Error = 4,
}

export interface PlaybackRange {
  /**
   * The position in midi ticks from where the song should start.
   */
  startTick: number;
  /**
   * The position in midi ticks to where the song should be played.
   */
  endTick: number;
}

export enum StaveProfile {
  /**
   * The profile is auto detected by the track configurations.
   */
  Default = 0,
  /**
   * Standard music notation and guitar tablature are rendered.
   */
  ScoreTab = 1,
  /**
   * Only standard music notation is rendered.
   */
  Score = 2,
  /**
   * Only guitar tablature is rendered.
   */
  Tab = 3,
  /**
   * Only guitar tablature is rendered, but also rests and time signatures are not shown.
   * This profile is typically used in multi-track scenarios.
   */
  TabMixed = 4,
}

export enum TabRhythmMode {
  /**
   * Rhythm notation is hidden.
   */
  Hidden = 0,
  /**
   * Rhythm notation is shown with individual beams per beat.
   */
  ShowWithBeams = 1,
  /**
   * Rhythm notation is shown and behaves like normal score notation with connected bars.
   */
  ShowWithBars = 2,
}

export enum LayoutMode {
  /**
   * Bars are aligned in rows using a fixed width.
   */
  Page = 0,
  /**
   * Bars are aligned horizontally in one row
   */
  Horizontal = 1,
}

export enum PlayerState {
  /**
   * Player is paused
   */
  Paused = 0,
  /**
   * Player is playing
   */
  Playing = 1,
}

export enum ScrollMode {
  /**
   * Do not scroll automatically
   */
  Off = 0,
  /**
   * Scrolling happens as soon the offsets of the cursors change.
   */
  Continuous = 1,
  /**
   * Scrolling happens as soon the cursors exceed the displayed range.
   */
  OffScreen = 2,
}

export enum NotationElement {
  /**
   * The score title shown at the start of the music sheet.
   */
  ScoreTitle = 0,
  /**
   * The score subtitle shown at the start of the music sheet.
   */
  ScoreSubTitle = 1,
  /**
   * The score artist shown at the start of the music sheet.
   */
  ScoreArtist = 2,
  /**
   * The score album shown at the start of the music sheet.
   */
  ScoreAlbum = 3,
  /**
   * The score words author shown at the start of the music sheet.
   */
  ScoreWords = 4,
  /**
   * The score music author shown at the start of the music sheet.
   */
  ScoreMusic = 5,
  /**
   * The score words&music author shown at the start of the music sheet.
   */
  ScoreWordsAndMusic = 6,
  /**
   * The score copyright owner shown at the start of the music sheet.
   */
  ScoreCopyright = 7,
  /**
   * The tuning information of the guitar shown
   * above the staves.
   */
  GuitarTuning = 8,
  /**
   * The track names which are shown in the accolade.
   */
  TrackNames = 9,
  /**
   * The chord diagrams for guitars. Usually shown
   * below the score info.
   */
  ChordDiagrams = 10,
  /**
   * Parenthesis that are shown for tied bends
   * if they are preceeded by bends.
   */
  ParenthesisOnTiedBends = 11,
  /**
   * The tab number for tied notes if the
   * bend of a note is increased at that point.
   */
  TabNotesOnTiedBends = 12,
  /**
   * Zero tab numbers on "dive whammys".
   */
  ZerosOnDiveWhammys = 13,
  /**
   * The alternate endings information on repeats shown above the staff.
   */
  EffectAlternateEndings = 14,
  /**
   * The information about the fret on which the capo is placed shown above the staff.
   */
  EffectCapo = 15,
  /**
   * The chord names shown above beats shown above the staff.
   */
  EffectChordNames = 16,
  /**
   * The crescendo/decrescendo angle  shown above the staff.
   */
  EffectCrescendo = 17,
  /**
   * The beat dynamics  shown above the staff.
   */
  EffectDynamics = 18,
  /**
   * The curved angle for fade in/out effects  shown above the staff.
   */
  EffectFadeIn = 19,
  /**
   * The fermata symbol shown above the staff.
   */
  EffectFermata = 20,
  /**
   * The fingering information.
   */
  EffectFingering = 21,
  /**
   * The harmonics names shown above the staff.
   * (does not represent the harmonic note heads)
   */
  EffectHarmonics = 22,
  /**
   * The let ring name and line above the staff.
   */
  EffectLetRing = 23,
  /**
   * The lyrics of the track shown above the staff.
   */
  EffectLyrics = 24,
  /**
   * The section markers shown above the staff.
   */
  EffectMarker = 25,
  /**
   * The ottava symbol and lines shown above the staff.
   */
  EffectOttavia = 26,
  /**
   * The palm mute name and line shown above the staff.
   */
  EffectPalmMute = 27,
  /**
   * The pick slide information shown above the staff.
   * (does not control the pick slide lines)
   */
  EffectPickSlide = 28,
  /**
   * The pick stroke symbols shown above the staff.
   */
  EffectPickStroke = 29,
  /**
   * The slight beat vibrato waves shown above the staff.
   */
  EffectSlightBeatVibrato = 30,
  /**
   * The slight note vibrato waves shown above the staff.
   */
  EffectSlightNoteVibrato = 31,
  /**
   * The tap/slap/pop effect names shown above the staff.
   */
  EffectTap = 32,
  /**
   * The tempo information shown above the staff.
   */
  EffectTempo = 33,
  /**
   * The additional beat text shown above the staff.
   */
  EffectText = 34,
  /**
   * The trill name and waves shown above the staff.
   */
  EffectTrill = 35,
  /**
   * The triplet feel symbol shown above the staff.
   */
  EffectTripletFeel = 36,
  /**
   * The whammy bar information shown above the staff.
   * (does not control the whammy lines shown within the staff)
   */
  EffectWhammyBar = 37,
  /**
   * The wide beat vibrato waves shown above the staff.
   */
  EffectWideBeatVibrato = 38,
  /**
   * The wide note vibrato waves shown above the staff.
   */
  EffectWideNoteVibrato = 39,
  /**
   * The left hand tap symbol shown above the staff.
   */
  EffectLeftHandTap = 40,
}
