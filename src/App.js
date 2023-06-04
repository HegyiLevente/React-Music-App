import { useState } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from "./data";
import "./styles/app.scss";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
