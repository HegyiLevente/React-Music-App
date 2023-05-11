import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
    const { songs, currentSong, setCurrentSong, isPlaying, setIsPlaying } = props;
    const audioRef = useRef(null);

    const [songTimeInfo, setSongTimeInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const playSong = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    }

    const setDraggedTime = (e) => {
        const draggedTime = e.target.value;
        audioRef.current.currentTime = draggedTime;
        setSongTimeInfo({ ...songTimeInfo, currentTime: draggedTime });
    }

    const updateTimeHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongTimeInfo({ ...songTimeInfo, currentTime, duration });
    }

    const autoPlayHandler = () => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }

    const skipSongBackwards = () => {
        const indexOfCurrentSong = songs.indexOf(currentSong);
        const indexOfPreviousSong = indexOfCurrentSong - 1;
        const indexOfFirstSong = 0;

        if (indexOfPreviousSong < indexOfFirstSong) {
            audioRef.current.currentTime = 0;
        } else {
            setCurrentSong(songs[indexOfPreviousSong]);
        }
    }

    const skipSongForward = () => {
        const indexOfCurrentSong = songs.indexOf(currentSong);
        const indexOfFollowingSong = indexOfCurrentSong + 1;
        const lastSongIndex = songs.length - 1;

        if (indexOfFollowingSong > lastSongIndex) {
            audioRef.current.currentTime = 0;
        } else {
            setCurrentSong(songs[indexOfFollowingSong]);
        }
    }

    return (
        <div className="player-container">
            <div className="time-control">
                <p>{formatTime(songTimeInfo.currentTime)}</p>
                <input onChange={setDraggedTime} min={0} max={songTimeInfo.duration} value={songTimeInfo.currentTime} type="range" />
                <p>{formatTime(songTimeInfo.duration || 0)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipSongBackwards()} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSong} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipSongForward()} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>

            <audio onLoadedData={autoPlayHandler}
                onTimeUpdate={updateTimeHandler}
                onLoadedMetadata={updateTimeHandler}
                ref={audioRef}
                src={currentSong.audio}>
            </audio>
        </div>
    );
}

export default Player;
