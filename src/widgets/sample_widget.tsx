import {
  usePlugin,
  renderWidget,
  LoadingSpinner,
  useAPIEventListener,
  AppEvents,
} from '@remnote/plugin-sdk';
import {
  AlphaTabApi,
  LayoutMode,
  LogLevel,
  Settings,
  StaveProfile,
  TabRhythmMode,
} from '@coderline/alphatab';
import React from 'react';
import { loadScript } from '../lib/load';
import { NotationElement } from '../lib/types';
import { createAlphatabApiSettings } from '../lib/alphatab';
import { PlayerButtons } from '../components/PlayerButtons';

const useAlphaTab = (ref: HTMLDivElement | null) => {
  const plugin = usePlugin();
  const [api, setApi] = React.useState<AlphaTabApi | null>(null);
  const setColor = (darkMode: boolean) => {
    const color = darkMode ? '#ffffff' : '#00000';
    if (!api) return;
    api.settings.display.resources.mainGlyphColor.rgba = color;
    api.settings.display.resources.secondaryGlyphColor.rgba = color;
    api.settings.display.resources.barNumberColor.rgba = color;
    api.updateSettings();
  };
  useAPIEventListener(AppEvents.setDarkMode, undefined, ({ darkMode }) => {
    setColor(darkMode);
  });
  React.useEffect(() => {
    if (ref) {
      const eff = async () => {
        // there's some weirdness with the way the alphatab library is loaded
        // requires webworkers and doesn't play nice with webpack
        await loadScript(
          'https://cdn.jsdelivr.net/npm/@coderline/alphatab@1.2.3/dist/alphaTab.min.js'
        );
        const api: AlphaTabApi = new window.alphaTab.AlphaTabApi(
          ref,
          createAlphatabApiSettings(plugin)
        );
        setColor(true);
        setApi(api);
      };
      eff();
    }
  }, [ref]);
  return api;
};

export const SampleWidget = () => {
  const plugin = usePlugin();
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  const api = useAlphaTab(ref);
  const [soundFontLoaded, setSoundFontLoaded] = React.useState(false);
  const [scoreLoaded, setScoreLoaded] = React.useState(false);
  api?.soundFontLoaded.on(() => {
    console.log('SoundFont Loaded !!!');
    setSoundFontLoaded(true);
  });
  api?.scoreLoaded.on(() => {
    console.log('Score Loaded !!!');
    setScoreLoaded(true);
  });

  const loading = !soundFontLoaded || !scoreLoaded || !api;
  return (
    <div className="at-wrap">
      <div className="at-content">
        <div className="at-sidebar">Track selector will go here</div>
        <div className="at-viewport">
          <div ref={setRef} className="at-main">
            {loading && <LoadingSpinner></LoadingSpinner>}
          </div>
        </div>
      </div>
      <div className="at-controls">
        {!loading && <PlayerButtons api={api} />}
        <div className="at-controls-right">
          <a className="btn toggle at-count-in">⌛</a>
          <a className="btn toggle at-metronome">⏰</a>
          <a className="btn toggle at-loop">🔁</a>
          <div className="at-zoom">
            <i className="fas fa-search"></i>
            <select>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="90">90%</option>
              <option value="100" selected>
                100%
              </option>
              <option value="110">110%</option>
              <option value="125">125%</option>
              <option value="150">150%</option>
              <option value="200">200%</option>
            </select>
          </div>
          <div className="at-layout">
            <select>
              <option value="horizontal">Horizontal</option>
              <option value="page" selected>
                Page
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

renderWidget(SampleWidget);
