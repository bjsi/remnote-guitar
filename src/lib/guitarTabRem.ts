import { Rem, RemId, RNPlugin, useTracker } from '@remnote/plugin-sdk';
import { guitarPowerupCode, tabDataSlotCode } from './consts';

export interface GuitarTabRem {
  rem: Rem;
  tabData: string | undefined;
}

export async function getGuitarTabRem(plugin: RNPlugin, remId: RemId) {
  const rem = await plugin.rem.findOne(remId);
  const tabData = await rem?.getPowerupProperty(guitarPowerupCode, tabDataSlotCode);
  if (rem && tabData) {
    return { rem, tabData };
  } else {
    return null;
  }
}

export function useGuitarTabRem(remId: RemId | undefined) {
  return useTracker(async (rp) => (remId ? await getGuitarTabRem(rp, remId) : undefined), [remId]);
}
