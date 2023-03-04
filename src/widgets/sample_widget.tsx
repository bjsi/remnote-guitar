import { usePlugin, renderWidget } from '@remnote/plugin-sdk';
import { AlphaTabApi, LogLevel, Settings } from '@coderline/alphatab';
import React from 'react';
import { loadScript } from '../lib/load';

const useAlphaTab = (ref: HTMLDivElement | null) => {
  const plugin = usePlugin();
  const [api, setApi] = React.useState<AlphaTabApi | null>(null);
  React.useEffect(() => {
    if (ref) {
      const eff = async () => {
        await loadScript(
          'https://cdn.jsdelivr.net/npm/@coderline/alphatab@1.2.3/dist/alphaTab.min.js'
        );
        const api = new window.alphaTab.AlphaTabApi(ref, {
          // any settings go here
          core: {
            fontDirectory: `${plugin.rootURL}font/`,
            file: 'https://www.alphatab.net/files/canon.gp',
            // scriptFile,
            logLevel: LogLevel.Info,
          },
          player: {
            enablePlayer: true,
            soundFont: `${plugin.rootURL}soundfont/sonivox.sf2`,
            //scrollElement: wrapper.querySelector('.at-viewport') // this is the element to scroll during playback
          },
        } as Settings);
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

  return (
    <div>
      {' '}
      <button onClick={() => api?.play()}>play</button>
      <div ref={setRef}></div>
    </div>
  );
};

renderWidget(SampleWidget);
