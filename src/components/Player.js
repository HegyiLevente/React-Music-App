import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
    const { currentSong, isPlaying, setIsPlaying } = props;
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

    const updateTime = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongTimeInfo({ ...songTimeInfo, currentTime, duration });
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

    return (
        <div className="player-container">
            <div className="time-control">
                <p>{formatTime(songTimeInfo.currentTime)}</p>
                <input onChange={setDraggedTime} min={0} max={songTimeInfo.duration} value={songTimeInfo.currentTime} type="range" />
                <p>{formatTime(songTimeInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSong} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>

            <audio onTimeUpdate={updateTime} onLoadedMetadata={updateTime} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
}

export default Player;
