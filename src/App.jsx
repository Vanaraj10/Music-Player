import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const currentAudio = useRef();
  const [currentSong, SetCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentVideo,setCurrentVideo] = useState(0);

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Aye Mr Minor",
    songArtist: "Haricharan & Shasha Tirupati",
    songSrc: "/songs/ayemrminor.mp3",
    songAvatar: "/avatar/ayemrminor.jpg",
  });

  const toggleAudio = () => {
    if (isPlaying) {
      currentAudio.current.pause();
      setIsPlaying(false);
    } else {
      currentAudio.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentAudio.current) {
      // Set total duration when metadata is loaded
      currentAudio.current.onloadedmetadata = () => {
        setTotalDuration(currentAudio.current.duration);
      };

      // Update current duration as the audio plays
      currentAudio.current.ontimeupdate = () => {
        setCurrentDuration(currentAudio.current.currentTime);
      };
    }
  }, [currentMusicDetails]);

  const nextSong = () => {
    const nextSongIndex = (currentSong + 1) % audioAPI.length;
    SetCurrentSong(nextSongIndex);
    setCurrentMusicDetails(audioAPI[nextSongIndex]);

    if (currentAudio.current) {
      currentAudio.current.src = currentMusicDetails.songSrc;
      currentAudio.current.load();
      currentAudio.current.onloadeddata = () => {
        currentAudio.current.play();
        setIsPlaying(true);
      };
    }
  };
  const prevSong = () => {
    const nextSongIndex = (currentSong - 1 + audioAPI.length) % audioAPI.length; // Handle negative index
    SetCurrentSong(nextSongIndex);
    const prevSongDetails = audioAPI[nextSongIndex]; // Get the previous song details
    setCurrentMusicDetails(prevSongDetails);

    if (currentAudio.current) {
      currentAudio.current.src = prevSongDetails.songSrc; // Use the correct song details
      currentAudio.current.load();
      currentAudio.current.onloadeddata = () => {
        currentAudio.current.play();
        setIsPlaying(true);
      };
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const audioAPI = [
    {
      songName: "Un parvayil",
      songArtist: "Karthik & Sumangali",
      songSrc: "/songs/unparvayil.mp3",
      songAvatar: "/avatar/unparvayil.jpg",
    },
    {
      songName: "Aye Mr Minor",
      songArtist: "Haricharan & Shasha Tirupati",
      songSrc: "/songs/ayemrminor.mp3",
      songAvatar: "/avatar/ayemrminor.jpg",
    },
    {
      songName: "I Like You",
      songArtist: "V J",
      songSrc: "/songs/ilikeyou.mp3",
      songAvatar: "/avatar/ilikeyou.jpeg",
    },
    {
      songName: "Azhagiye",
      songArtist: "V J",
      songSrc: "/songs/azhagiye.mp3",
      songAvatar: "/avatar/azhagiye.jpeg",
    },
    {
      songName: "Vazhithunaiye",
      songArtist: "Leon James",
      songSrc: "/songs/Vazhithunaiye.mp3",
      songAvatar: "/avatar/Vazhithunaiye.jpg",
    },
    {
      songName: "Ambikapathy",
      songArtist: "A R Rahman",
      songSrc: "/songs/Ambikapathy.mp3",
      songAvatar: "/avatar/Ambikapathy.jpg",
    },
  ];

  const videoArray = ["/videos/v1.mp4", "/videos/v2.mp4",'/videos/v3.mp4'];
  
  const nextVideo = ()=>{
    setCurrentVideo((currentVideo+1)%videoArray.length)
  }

  return (
    <>
      <audio src={currentMusicDetails.songSrc} ref={currentAudio} preload="auto"></audio>
      <video
        src={videoArray[currentVideo]}
        loop
        muted
        autoPlay
        preload="auto"
        className="backgroundVideo"
      ></video>
      <div className="main-container">
        <h2 className="music-head">Music Player</h2>
        <h2 className="song-name">{currentMusicDetails.songName}</h2>
        <p className="artist-name">{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} loading="lazy" preload="auto"></img>
        <div className="duration">
          <p>{formatTime(currentDuration)}</p>
          <p>{formatTime(totalDuration)}</p>
        </div>
        <input
          className="progress-bar"
          type="range"
          value={currentDuration}
          max={totalDuration}
          onChange={(e) => {
            currentAudio.current.currentTime = e.target.value;
          }}
        />
        <div className="music-controls">
          <img src="/icons/backward.png" onClick={prevSong} />
          <img src="/icons/pause.png" onClick={toggleAudio} />
          <img src="/icons/fast-forward.png" onClick={nextSong} />
        </div>
        <p>Volume Controls</p>
        <div className="volume-controls">
          <img src="/icons/mute.png" alt="" />
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={(e) => {
              currentAudio.current.volume = e.target.value;
            }}
          />
          <img src="/icons/sound.png" alt="" />
        </div>
      </div>
      <center>
        <div className="change-video" onClick={nextVideo}>Change Background</div>
      </center>
      <p className="footer">Made by VJ_2303</p>
    </>
  );
};

export default App;
