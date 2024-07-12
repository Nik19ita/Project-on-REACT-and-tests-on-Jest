import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlayListInfoPage.css";

export function PlayListInfoPage() {
  const { playlistId } = useParams();
  const playlist = PLAYLISTS[Number(playlistId)];

  return (
    <div className="playListInfoPage" data-testid="playListInfoPage">
      <h2>PlayListInfoPage</h2>
      {playlist.genre === "" ? (
        "Нет такого плейлиста"
      ) : (
        <div className="playlist">
          <p data-testid="genre">
            {"Жанр: "}
            <Link to={`/playlist`}>{playlist.genre}</Link>
          </p>
          <p data-testid="name">
            {"Название: "}
            <span>{playlist.name}</span>
          </p>
          <ul data-testid="songs">
            {playlist.songs.map((el, index) => (
              <li data-testid="song" key={index}>
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
