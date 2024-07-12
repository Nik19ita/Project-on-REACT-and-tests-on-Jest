import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { MainPage, UsersPage } from "../pages";
import { PlayList } from "../pages/PlayList/PlayList";

let mockSearchParam = {};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams());
    return [
      params,
      (newParams: any) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(mockSearchParam));
      },
    ];
  },
}));

afterEach(() => {
  mockSearchParam = {};
});

describe("Тест компонента MainPage", () => {
  test("Снапшот тест", () => {
    const { container } = render(<MainPage />);
    expect(container).toMatchSnapshot();
  });
});

describe("Тест компонента UsersPage", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );
  };

  it("тест, проверяющий вызов метода setSearchParam из react-router-dom при вводе имени пользователя", () => {
    const { getByTestId } = renderComponent();
    fireEvent.change(getByTestId("input"), { target: { value: "Антон" } });
    expect(mockSearchParam).toEqual({ searchName: "антон" });
  });
});

describe("Тест компонента PlaylistsPage", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <PlayList />
      </MemoryRouter>
    );
  };

  it("тест, проверяющий вызов метода setSearchParam из react-router-dom при вводе жанра и названия", () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId("input-1"), { target: { value: "rocks" } });
    expect(mockSearchParam).toEqual({ searchGenre: "rocks", searchName: "" });

    fireEvent.change(getByTestId("input-2"), { target: { value: "name" } });
    expect(mockSearchParam).toEqual({
      searchGenre: "rocks",
      searchName: "name",
    });
  });
});
