import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { USERS } from "../data";
import { UserInfoPage } from "../pages";
import { IUser } from "../data/interfaces";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ userId: 0 }),
}));
jest.mock("../data/users", () => ({
  ...jest.requireActual("../data/users"),
  USERS: [],
}));

beforeEach(() => {
  USERS.splice(0, USERS.length);
});

describe("Тест компонента UserInfoPage", () => {
  const userEmpty = [] as IUser[]
  

  const userFull = [
    {
      id: 20,
      email: "Sophia3@gmail.com",
      fullName: "Abraham Walsh",
      jobTitle: "Investor Optimization Executive",
      avatar: "https://avatars.githubusercontent.com/u/14016129",
      bio: "Mollitia eos ducimus porro",
      playlist: {
        id: 0,
        genre: "Rock",
        name: "Great Rock Hits",
        songs: ["Dancing in the Dark"],
      },
    },
  ];

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <UserInfoPage />
      </MemoryRouter>
    );
  };

  it("тест, проверяющий текст по умолчанию, если нет пользователя", () => {
    USERS.push(...userEmpty)
    const { getByTestId } = renderComponent();

    expect(getByTestId("usersInfoPageEmpty")).toHaveTextContent(
      "пользователя c таким userId нет"
    );
  });

  it("тест, проверяющий данные о пользователе, если он существует (email, имя, ссылка на плейлист).", () => {
    USERS.push(...userFull)
    const { getByTestId, getByRole } = renderComponent();

    expect(getByTestId("email")).toHaveTextContent(userFull[0].email);
    expect(getByTestId("fullName")).toHaveTextContent(userFull[0].fullName);
    expect(getByRole("link")).toHaveAttribute(
      "href",
      `/playlist/${userFull[0].playlist.id}`
    );
  });
});
