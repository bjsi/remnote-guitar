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
              if (typeof fileText === 'string') {
                console.log('File text:', fileText);
                await remAndData?.rem.setPowerupProperty(guitarPowerupCode, tabDataSlotCode, [
                  fileText,
                ]);
              }
            };

            // Read the file as text
            reader.readAsText(file);
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
        hi
      </button>
    </>
  );
}

renderWidget(EditorButton);
