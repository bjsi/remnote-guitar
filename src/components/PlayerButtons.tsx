import { usePlugin } from '@remnote/plugin-sdk';
import { apiNamespaces } from '@remnote/plugin-sdk/dist/reactivity';
import React from 'react';
import { Children, useEffect, useState } from 'react';
import {
  guitarPowerupCode,
  playbackRangeSlotCode,
  playbackSpeedSlotCode,
  tabDataSlotCode,
} from '../lib/consts';
import { GuitarTabRem } from '../lib/guitarTabRem';
import { formatRemTitle } from '../lib/textFormatting';
import { LayoutMode, PlayerState } from '../lib/types';
import { AlphaTabApi } from '../types/alphaTab';

interface PlayerButtonsProps {
  api: AlphaTabApi;
  remAndData: GuitarTabRem;
}

export function PlayerButtons(props: PlayerButtonsProps) {
  const plugin = usePlugin();
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.Paused);

  useEffect(() => {
    props.api.playerStateChanged.on((args) => {
      setPlayerState(args.state);
    });
  }, []);

  // hack
  const firstPlay = React.useRef(false);

  function playPause() {
    if (playerState == PlayerState.Paused) {
      props.api.play();
      if (!firstPlay.current) {
        firstPlay.current = true;
        if (props.remAndData?.playbackSpeed != null) {
          props.api!.playbackSpeed = props.remAndData.playbackSpeed;
        }

        if (props.remAndData?.playbackRange) {
          props.api!.isLooping = true;
          props.api!.playbackRange = props.remAndData.playbackRange;
        }
      }
    } else {
      props.api.pause();
    }
  }

  function toggleMetronome() {
    const metronomeVolume = props.api.metronomeVolume;
    props.api.metronomeVolume = 1;

    if (metronomeVolume == 0) {
      props.api.metronomeVolume = 4;
    } else {
      props.api.metronomeVolume = 0;
    }
  }

  function toggleCountIn() {
    const countInVolume = props.api.countInVolume;
    if (countInVolume == 0) {
      props.api.countInVolume = 4;
    } else {
      props.api.countInVolume = 0;
    }
  }

  function toggleLoop() {
    props.api.isLooping = !props.api.isLooping;
  }

  async function extract() {
    const range = props.api.playbackRange;
    if (!range) {
      plugin.app.toast('No playback range selected');
      return;
    }
    const childRem = await plugin.rem.createRem();
    if (!childRem) return;
    await childRem.setText([formatRemTitle(props.api.score) + ' ']);
    await childRem.addPowerup(guitarPowerupCode);
    await childRem.setPowerupProperty(guitarPowerupCode, tabDataSlotCode, [
      JSON.stringify(props.remAndData.tabData),
    ]);
    await childRem.setPowerupProperty(guitarPowerupCode, playbackRangeSlotCode, [
      JSON.stringify(range),
    ]);
    const speed = props.api.playbackSpeed;
    await childRem.setPowerupProperty(guitarPowerupCode, playbackSpeedSlotCode, [speed.toString()]);
    await childRem.setParent(props.remAndData.rem._id);
  }

  return (
    <>
      <button onClick={() => playPause()}>
        {playerState == PlayerState.Playing ? 'Pause' : 'Play'}
      </button>
      <div className="at-controls-right">
        <a onClick={() => extract()}>X</a>
        <a
          onClick={() => {
            toggleMetronome();
          }}
          className="btn toggle at-count-in"
        >
          ⌛
        </a>
        <a
          onClick={() => {
            toggleCountIn();
          }}
          className="btn toggle at-metronome"
        >
          ⏰
        </a>
        <a
          onClick={() => {
            toggleLoop();
          }}
          className="btn toggle at-loop"
        >
          🔁
        </a>
        <div className="at-zoom">
          <i className="fas fa-search"></i>
          <select
            onChange={(e) => {
              const value = e.target.value;
              const speed = parseInt(value) / 100;
              props.api.playbackSpeed = speed;
              props.remAndData.rem.setPowerupProperty(guitarPowerupCode, playbackSpeedSlotCode, [
                speed.toString(),
              ]);
            }}
            value={props.remAndData.playbackSpeed * 100}
          >
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="90">90%</option>
            <option value="100">100%</option>
            <option value="110">110%</option>
            <option value="125">125%</option>
            <option value="150">150%</option>
            <option value="200">200%</option>
          </select>
        </div>
        <div className="at-layout">
          <select
            onChange={(e) => {
              const value = e.target.value;
              switch (value) {
                case 'horizontal':
                  props.api.settings.display.layoutMode = LayoutMode.Horizontal;
                  break;
                case 'page':
                  props.api.settings.display.layoutMode = LayoutMode.Page;
                  break;
              }
              props.api.updateSettings();
              props.api.render();
            }}
          >
            <option value="horizontal">Horizontal</option>
            <option value="page" selected>
              Page
            </option>
          </select>
        </div>
      </div>
    </>
  );
}
