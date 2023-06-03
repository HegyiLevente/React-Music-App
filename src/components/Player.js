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

    const handleSongPlayPauseOption = () => {
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

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const setDraggedTimeHandler = (e) => {
        const draggedTime = e.target.value;
        audioRef.current.currentTime = draggedTime;
        setSongTimeInfo({ ...songTimeInfo, currentTime: draggedTime });
    }

    const updateTimeEventHandler = (e) => {
        const currentTime = Math.min(e.target.currentTime, songTimeInfo.duration);
        setSongTimeInfo((prevSongTimeInfo) => ({
            ...prevSongTimeInfo,
            currentTime,
        }));
    };

    const autoPlayEventHandler = () => {
        if (isPlaying) {
            audioRef.current.play();
        }
        setSongTimeInfo((prevSongTimeInfo) => ({
            ...prevSongTimeInfo,
            duration: audioRef.current.duration,
        }));
    };


    const skipSongBackwards = async () => {
        const indexOfCurrentSong = songs.indexOf(currentSong);
        const indexOfPreviousSong = indexOfCurrentSong - 1;
        const indexOfFirstSong = 0;

        if (indexOfPreviousSong < indexOfFirstSong) {
            audioRef.current.currentTime = 0;
        } else {
            await setCurrentSong(songs[indexOfPreviousSong]);
        }
    }

    const skipSongForward = async () => {
        if (isCurrentSongTheLast()) {
            audioRef.current.currentTime = 0;
        } else {
            await setCurrentSong(songs[getNextSongIndex()]);
        }
    }

    const songEndEventHandler = async () => {
        if (isCurrentSongTheLast()) {
            audioRef.current.currentTime = 0;
            handleSongPlayPauseOption();
        } else {
            await setCurrentSong(songs[getNextSongIndex()]);
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }

    const isCurrentSongTheLast = () => {
        const lastSongIndex = songs.length - 1;

        if (getNextSongIndex() > lastSongIndex) {
            return true;
        }
        return false;
    }

    const getNextSongIndex = () => {
        const indexOfCurrentSong = songs.indexOf(currentSong);
        return indexOfCurrentSong + 1;
    }

    return (
        <div className="player-container">
            <div className="time-control">
                <p>{formatTime(songTimeInfo.currentTime)}</p>
                <input onChange={setDraggedTimeHandler} min={0} max={songTimeInfo.duration || 0} value={songTimeInfo.currentTime} type="range" />
                <p>{formatTime(songTimeInfo.duration || 0)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipSongBackwards()} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={handleSongPlayPauseOption} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipSongForward()} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>

            <audio onLoadedData={autoPlayEventHandler}
                onTimeUpdate={updateTimeEventHandler}
                onLoadedMetadata={updateTimeEventHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndEventHandler}>
            </audio>
        </div>
    );
}

export default Player;
