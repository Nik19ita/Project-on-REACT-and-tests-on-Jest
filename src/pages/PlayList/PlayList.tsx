import { ChangeEvent } from "react";
import { PLAYLISTS } from "../../data";
import "./PlayList.css";
import { Link, useSearchParams } from "react-router-dom";

export function PlayList() {
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchParam)

  const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchParam({ searchName: searchName, searchGenre: value.toLowerCase(),  });
  };

  const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchParam({ searchName: value.toLowerCase(), searchGenre: searchGenre });
  };

  const searchName = searchParam.get("searchName") || "";
  const searchGenre = searchParam.get("searchGenre") || "";

  const filteredPlayList = PLAYLISTS.filter(({ name, genre }) => {
    if(name.toLowerCase().includes(searchName) &&
    genre.toLowerCase().includes(searchGenre))return true;
  });

  return (
    <div className="playlistPage">
      <h2>PlayListPage</h2>

      <div className="playlist">
        <label>
          введите жанр{" "}
          <input type="text" value={searchGenre} onChange={handleSearchGenre} data-testid='input-1'/>
        </label>

        <label>
          введите название{" "}
          <input type="text" value={searchName} onChange={handleSearchName} data-testid='input-2'/>
        </label>

        {filteredPlayList.map(
          ({ id, name, genre }) =>
            genre === "Non Music" || (
              <Link to={`/playlist/${id}`} key={id}>
                {name}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
function useParams(): { playlistId: any; } {
  throw new Error("Function not implemented.");
}

