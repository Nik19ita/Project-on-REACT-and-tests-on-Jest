import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./app.css";
import { MainPage, UserInfoPage, UsersPage } from "./pages";
import { PlayList } from "./pages/PlayList/PlayList";
import { PlayListInfoPage } from "./pages/PlayListInfoPages/PlayListInfoPage";
import { PLAYLISTS } from "./data/playlists";


export function App() {
  return (
    <BrowserRouter>
      <div className="header">_</div>

      <div className="section">
        <nav className="navMenu">
          <Link to={"/"}>Главная</Link>
          <Link to={"/users"}>Пользователи</Link>
          <Link to={"/playlist"}>Плейлисты</Link>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserInfoPage />} />
            <Route path="/playlist" element={<PlayList />} />
            <Route
              path="/playlist/:playlistId"
              element={<PlayListInfoPage />}
            />
          </Routes>
        </main>
      </div>

      <div className="footer">
        <a href="https://skillbox.ru/code/">https://skillbox.ru/</a>
      </div>
    </BrowserRouter>
  );
}
function useParams(): { playlistId: any } {
  throw new Error("Function not implemented.");
}
