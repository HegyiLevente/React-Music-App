import React from "react";

const LibrarySong = (props) => {
    const { song, currentSong, setCurrentSong } = props;

    const selectSong = () => {
        setCurrentSong(song);
    }

    return (
        <div onClick={selectSong} className={`library-song ${song.id === currentSong.id ? "active-song" : ""} `}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;