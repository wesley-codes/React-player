import "./App.css";
import ReactPlayer from "react-player";
import { Container } from "@material-ui/core";
import Control from "./Components/Control";
import { useState, useRef } from "react";

function App() {
  const videoPlayerRef = useRef(null);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking } = videoState;

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    //FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const progressHandler = (state) => {
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    console.log(value);

    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  return (
    <div className="video_container">
      <div>
        <h2>React player</h2>
      </div>
      <Container maxWidth="md" justify="center">
        <div className="player__wrapper">
          <ReactPlayer
            ref={videoPlayerRef}
            className="player"
            url="https://bucket-viewer.s3.amazonaws.com/viewer1664370329252.mp4"
            width="100%"
            height="100%"
            playing={playing}
            volume = {volume}
            muted={muted}
            onProgress={progressHandler}
          />
          <Control
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume ={volume}
            onVolumeChangeHandler = {volumeChangeHandler}
            onVolumeSeekUp = {volumeSeekUpHandler}
            mute = {muted}
            onMute = {muteHandler}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
