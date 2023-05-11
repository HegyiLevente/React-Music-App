import React from "react";
import LibrarySong from "./LibrarySong";

const Library = (props) => {
    const { songs, currentSong, setCurrentSong, libraryStatus } = props;

    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong key={song.id} song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} />)}
            </div>
        </div>
    );
}

export default Library;