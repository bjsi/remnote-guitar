import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerWidget('sample_widget', WidgetLocation.Pane, {
    dimensions: { height: 'auto', width: '100%' },
  });

  await plugin.app.registerCommand({
    id: 'open_music',
    name: 'Open Music',
    action: async () => {
      await plugin.window.openWidgetInPane('sample_widget');
    },
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
