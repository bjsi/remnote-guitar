import { usePlugin, useAPIEventListener, AppEvents } from '@remnote/plugin-sdk';
import React from 'react';
import { AlphaTabApi } from '../types/alphaTab';
import { createAlphatabApiSettings } from './alphatab';
import { loadScript } from './load';

export const useAlphaTab = (ref: HTMLDivElement | null) => {
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
        const api = new window.alphaTab.AlphaTabApi(ref, createAlphatabApiSettings(plugin));
        setColor(false);
        setApi(api);
      };
      eff();
    }
  }, [ref]);
  return api;
};
