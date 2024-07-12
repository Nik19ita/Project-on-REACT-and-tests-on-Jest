import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PLAYLISTS } from "../data";
import { PlayListInfoPage } from "../pages/PlayListInfoPages/PlayListInfoPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ playlistId: 0 }),
}));

jest.mock("../data/playlists", () => ({
  ...jest.requireActual("../data/playlists"),
  PLAYLISTS: [],
}));

beforeEach(() => {
  PLAYLISTS.splice(0, PLAYLISTS.length);
});

describe("Тест компонента PlaylistInfoPage", () => {
  const playlistTestEmpty = [{ id: 0, genre: "", name: "", songs: [] }];

  const playlistTestFull = [
    {
      id: 0,
      genre: "Rock",
      name: "Great Rock Hits",
      songs: ["Dancing in the Dark"],
    },
  ];

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <PlayListInfoPage />
      </MemoryRouter>
    );
  };

  it("тест, проверяющий текст по умолчанию, если нет доступного плейлиста", () => {
    PLAYLISTS.push(...playlistTestEmpty);

    const { getByTestId } = renderComponent();

    expect(getByTestId("playListInfoPage")).toHaveTextContent(
      "Нет такого плейлиста"
    );
  });

  it("тест, проверяющий текст по умолчанию, если нет доступного плейлиста", () => {
    PLAYLISTS.push(...playlistTestFull);

    const { getByTestId, getAllByTestId } = renderComponent();

    expect(getByTestId("genre")).toHaveTextContent(
      `Жанр: ${playlistTestFull[0].genre}`
    );
    expect(getByTestId("name")).toHaveTextContent(
      `Название: ${playlistTestFull[0].name}`
    );
    expect(getAllByTestId("song")).toHaveLength(
      playlistTestFull[0].songs.length
    );
  });
});
