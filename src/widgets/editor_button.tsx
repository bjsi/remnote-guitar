import {
  renderWidget,
  usePlugin,
  useRunAsync,
  useTracker,
  WidgetLocation,
} from '@remnote/plugin-sdk';
import React from 'react';
import { guitarPowerupCode, tabDataSlotCode } from '../lib/consts';
import { useGuitarTabRem } from '../lib/guitarTabRem';

export function EditorButton() {
  const plugin = usePlugin();
  const ctx = useRunAsync(
    () => plugin.widget.getWidgetContext<WidgetLocation.RightSideOfEditor>(),
    []
  );
  const remAndData = useGuitarTabRem(ctx?.remId);
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={ref}
        type={'file'}
        style={{ display: 'none' }}
        onChange={(event) => {
          if (!event.target || !('files' in event.target)) {
            return;
          }
          // @ts-ignore
          const file: File = event.target?.files?.[0];

          // Check if the file extension is '.gp'
          if (file.name.endsWith('.gp')) {
            const reader = new FileReader();

            reader.onload = async (readerEvent) => {
              const fileText = readerEvent.target?.result;
              if (fileText instanceof ArrayBuffer && remAndData?.rem) {
                const uint8Array = Array.from(new Uint8Array(fileText));
                const json = JSON.stringify(uint8Array);
                await remAndData.rem.setPowerupProperty(guitarPowerupCode, tabDataSlotCode, [json]);
                await plugin.window.openWidgetInPane('pane_guitar_tab', {
                  remId: remAndData.rem._id,
                });
              }
            };

            reader.readAsArrayBuffer(file);
          } else {
            console.log('Invalid file extension');
          }
        }}
      />
      <button
        className="cursor-pointer"
        onClick={() => {
          console.log('click');
          ref.current?.click();
        }}
      >
        🎸
      </button>
    </>
  );
}

renderWidget(EditorButton);
