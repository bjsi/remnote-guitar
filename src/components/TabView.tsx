import { LoadingSpinner, usePlugin, useTracker } from '@remnote/plugin-sdk';
import React from 'react';
import { guitarPowerupCode, tabDataSlotCode } from '../lib/consts';
import { useGuitarTabRem } from '../lib/guitarTabRem';
import { useAlphaTab } from '../lib/useAlphaTab';
import { PlayerButtons } from './PlayerButtons';

interface TabViewProps {
  remId: string;
}

export const TabView = (props: TabViewProps) => {
  const plugin = usePlugin();
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  const api = useAlphaTab(ref);
  const [soundFontLoaded, setSoundFontLoaded] = React.useState(false);
  const [scoreLoaded, setScoreLoaded] = React.useState(false);
  const remAndData = useGuitarTabRem(props.remId);

  React.useEffect(() => {
    if (!remAndData || !api || scoreLoaded) return;
    const encoder = new TextEncoder();
    const data = encoder.encode(remAndData.tabData);
    let score = window.alphaTab.importer.ScoreLoader.loadScoreFromBytes(data);
    api.load(score);
  }, [remAndData, api]);

  if (!api || remAndData == null) return null;

  api.soundFontLoaded.on(() => {
    console.log('SoundFont Loaded !!!');
    setSoundFontLoaded(true);
  });
  api.scoreLoaded.on(() => {
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
