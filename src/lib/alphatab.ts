import { LayoutMode, LogLevel, Settings, StaveProfile, TabRhythmMode } from '@coderline/alphatab';
import { RNPlugin } from '@remnote/plugin-sdk';
import { NotationElement } from './types';

export const createAlphatabApiSettings = (plugin: RNPlugin) => ({
  // any settings go here
  core: {
    fontDirectory: `${plugin.rootURL}font/`,
    file: 'https://www.alphatab.net/files/canon.gp',
    logLevel: LogLevel.Info,
  } as Settings['core'],
  player: {
    enablePlayer: true,
    soundFont: `${plugin.rootURL}soundfont/sonivox.sf2`,
    //scrollElement: wrapper.querySelector('.at-viewport') // this is the element to scroll during playback
  } as Settings['player'],
  // @ts-ignore
  display: {
    layoutMode: LayoutMode.Page,
    staveProfile: StaveProfile.Tab,
    resources: {
      mainGlyphColor: '#ffffff',
      secondaryGlyphColor: '#ffffff',
      scoreInfoColor: '#ffffff',
      staffLineColor: '#ffffff',
      barSeparatorColor: '#ffffff',
    },
  } as Settings['display'],
  notation: {
    rhythmMode: TabRhythmMode.ShowWithBars,
    elements: new Map([
      [NotationElement.ScoreTitle, false],
      [NotationElement.ScoreSubTitle, false],
      [NotationElement.ScoreArtist, false],
      [NotationElement.ScoreAlbum, false],
      [NotationElement.ScoreWords, false],
      [NotationElement.ScoreMusic, false],
      [NotationElement.ScoreWordsAndMusic, false],
      [NotationElement.ScoreCopyright, false],
      [NotationElement.GuitarTuning, true],
    ]),
  } as Settings['notation'],
});
