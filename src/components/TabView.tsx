import { LoadingSpinner, usePlugin, useTracker } from '@remnote/plugin-sdk';
import React from 'react';
import { guitarPowerupCode, tabDataSlotCode } from '../lib/consts';
import { useGuitarTabRem } from '../lib/guitarTabRem';
import { formatRemTitle } from '../lib/textFormatting';
import { useAlphaTab } from '../lib/useAlphaTab';
import { throttle } from '../lib/utils';
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
    const json = JSON.parse(remAndData.tabData || '[]');
    const uint8Array = new Uint8Array(json);
    let score = window.alphaTab.importer.ScoreLoader.loadScoreFromBytes(uint8Array);
    if (!remAndData.rem.text || remAndData.rem.text.length == 0) {
      remAndData.rem.setText([formatRemTitle(score)]);
    }
    api.load(score);
  }, [remAndData, api, scoreLoaded]);

  const viewportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onSoundFontLoaded = () => {
      console.log('SoundFont Loaded !!!');
      setSoundFontLoaded(true);
    };

    const onScoreLoaded = () => {
      console.log('Score Loaded !!!');
      setScoreLoaded(true);
    };

    const [onPositionChanged] = throttle(() => {
      const caret = viewportRef.current?.querySelector('.at-cursor-beat');
      const container = viewportRef.current;
      if (!caret || !container) return;
      caret.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300);

    if (api) {
      api.soundFontLoaded.on(onSoundFontLoaded);
      api.scoreLoaded.on(onScoreLoaded);
      api.playerPositionChanged.on(onPositionChanged);
    }
    return () => {
      api?.soundFontLoaded.off(onScoreLoaded);
      api?.scoreLoaded.off(onScoreLoaded);
      api?.playerPositionChanged.off(onPositionChanged);
    };
  }, [api]);

  const setInitSettings = React.useRef(false);

  React.useEffect(() => {
    if (!remAndData || !api || !scoreLoaded || setInitSettings) return;
    // hack
    api.play();
    api.pause();
    if (remAndData?.playbackSpeed != null) {
      api!.playbackSpeed = remAndData.playbackSpeed;
    }

    if (remAndData?.playbackRange) {
      api!.isLooping = true;
      api!.playbackRange = remAndData.playbackRange;
    }
    // @ts-ignore
    setInitSettings.current = true;
  }, [scoreLoaded, soundFontLoaded, remAndData, setInitSettings.current]);

  const loading = !soundFontLoaded || !scoreLoaded || !api;
  return (
    <div
      onKeyDown={(event) => {
        // backspace
        if (event.key === 'Backspace') {
          api?.stop();
          viewportRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }}
      className="at-wrap"
    >
      <div className="at-content">
        <div ref={viewportRef} className="at-viewport">
          <div ref={setRef} className="at-main">
            {loading && <LoadingSpinner></LoadingSpinner>}
          </div>
        </div>
      </div>
      <div className="at-controls">
        {!loading && remAndData && <PlayerButtons api={api} remAndData={remAndData} />}
      </div>
    </div>
  );
};
