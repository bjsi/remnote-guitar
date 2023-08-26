import {
  declareIndexPlugin,
  PropertyType,
  ReactRNPlugin,
  WidgetLocation,
} from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';
import { guitarPowerupCode, tabDataSlotCode } from '../lib/consts';

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerPowerup(
    'Guitar',
    guitarPowerupCode,
    'Tagging a Rem with this powerup allows you to use this Rem to store and load guitar tabs.',
    {
      slots: [
        {
          code: tabDataSlotCode,
          hidden: true,
          name: 'Tab Data',
          propertyType: PropertyType.TEXT,
          onlyProgrammaticModifying: true,
        },
      ],
    }
  );

  await plugin.app.registerWidget('pane_guitar_tab', WidgetLocation.Pane, {
    dimensions: { height: 'auto', width: '100%' },
  });

  await plugin.app.registerCommand({
    id: 'open_music',
    name: 'Open Music',
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) {
        return;
      } else if (!(await focusedRem.hasPowerup(guitarPowerupCode))) {
        await plugin.app.toast('This rem does not have the Guitar powerup.');
        return;
      } else {
        await plugin.window.openWidgetInPane('pane_guitar_tab', {
          remId: focusedRem._id,
        });
      }
    },
  });

  await plugin.app.registerWidget('queue_guitar_tab', WidgetLocation.Flashcard, {
    dimensions: { height: 'auto', width: '100%' },
    powerupFilter: guitarPowerupCode,
  });

  await plugin.app.registerCommand({
    id: 'tag_as_guitar_tab',
    name: 'Tag As Guitar Tab',
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) {
        return;
      } else if (await focusedRem.hasPowerup(guitarPowerupCode)) {
        return;
      } else {
        await focusedRem.addPowerup(guitarPowerupCode);
      }
    },
  });

  await plugin.app.registerWidget('editor_button', WidgetLocation.RightSideOfEditor, {
    dimensions: { height: 'auto', width: '25px' },
    powerupFilter: guitarPowerupCode,
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
