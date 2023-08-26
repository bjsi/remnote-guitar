import { usePlugin, renderWidget, useRunAsync, WidgetLocation } from '@remnote/plugin-sdk';
import { TabView } from '../components/TabView';

function PaneGuitarTab() {
  const plugin = usePlugin();
  const ctx = useRunAsync(() => plugin.widget.getWidgetContext<WidgetLocation.Pane>(), []);
  if (!ctx) return null;
  return <TabView remId={ctx?.contextData.remId}></TabView>;
}

renderWidget(PaneGuitarTab);
