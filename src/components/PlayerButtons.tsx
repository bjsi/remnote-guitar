import { AlphaTabApi } from '@coderline/alphatab';
import { useEffect, useState } from 'react';
import { PlayerState } from '../lib/types';

interface PlayerButtonsProps {
  api: AlphaTabApi;
}

export function PlayerButtons(props: PlayerButtonsProps) {
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.Paused);
  const [loopingState, setLoopingState] = useState(false);

  let metronomeVolume = null;
  let countInVolume = null;

  useEffect(() => {
    props.api.playerStateChanged.on((args) => {
      setPlayerState(args.state);
    });
  }, []);

  function playPause() {
    props.api.playPause();
  }

  function stop() {
    props.api.stop();
  }

  function metronome() {
    metronomeVolume = props.api.metronomeVolume;
    props.api.metronomeVolume = 1;

    if (metronomeVolume == 0) {
      props.api.metronomeVolume = 4;
    } else {
      props.api.metronomeVolume = 0;
    }
  }

  function countIn() {
    countInVolume = props.api.countInVolume;
    if (countInVolume == 0) {
      props.api.countInVolume = 4;
    } else {
      props.api.countInVolume = 0;
    }
  }

  function loopingHandler() {
    setLoopingState(!props.api.isLooping);
    props.api.isLooping = loopingState;
  }
  return (
    <button onClick={() => playPause()}>
      {playerState == PlayerState.Playing ? 'Pause' : 'Play'}
    </button>
  );
}
