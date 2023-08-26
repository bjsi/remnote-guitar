import {
  useRunAsync,
  WidgetLocation,
  renderWidget,
  usePlugin,
  useTracker,
} from '@remnote/plugin-sdk';
import { TabView } from '../components/TabView';

function PaneGuitarTab() {
  const plugin = usePlugin();
  const ctx = useRunAsync(() => plugin.widget.getWidgetContext<WidgetLocation.Flashcard>(), []);
  if (!ctx) return null;
  return <TabView remId={ctx?.remId}></TabView>;
}

renderWidget(PaneGuitarTab);
