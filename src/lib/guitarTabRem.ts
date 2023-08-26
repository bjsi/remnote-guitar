import { Rem, RemId, RNPlugin, useTracker } from '@remnote/plugin-sdk';
import {
  guitarPowerupCode,
  playbackRangeSlotCode,
  playbackSpeedSlotCode,
  tabDataSlotCode,
} from './consts';
import { PlaybackRange } from './types';
import { tryParseJson } from './utils';

export interface GuitarTabRem {
  rem: Rem;
  tabData: string | undefined;
  playbackRange: PlaybackRange | undefined;
  playbackSpeed: number;
}

export async function getGuitarTabRem(
  plugin: RNPlugin,
  remId: RemId
): Promise<GuitarTabRem | null> {
  const rem = await plugin.rem.findOne(remId);
  const tabData = await rem?.getPowerupProperty(guitarPowerupCode, tabDataSlotCode);
  const playbackRangeRaw = await rem?.getPowerupProperty(guitarPowerupCode, playbackRangeSlotCode);
  const playbackRange = tryParseJson(playbackRangeRaw);
  const playbackSpeedRaw = await rem?.getPowerupProperty(guitarPowerupCode, playbackSpeedSlotCode);
  const playbackSpeed = tryParseJson(playbackSpeedRaw) || 1;
  if (rem) {
    return { rem, tabData, playbackRange, playbackSpeed };
  } else {
    return null;
  }
}

export function useGuitarTabRem(remId: RemId | undefined) {
  return useTracker(async (rp) => (remId ? await getGuitarTabRem(rp, remId) : undefined), [remId]);
}
