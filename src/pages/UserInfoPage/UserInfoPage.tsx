import { Link, useParams } from "react-router-dom";
import { USERS } from "../../data";
import "./UserInfoPage.css";
import { IUser } from "../../data/interfaces";

export function UserInfoPage() {
  const { userId } = useParams();
  const user = USERS[Number(userId)];
  
  if (!user) {
    return (
      <div className="userInfoPage"  data-testid="usersInfoPageEmpty">
        <h2>UserInfoPage</h2>

        <div className="users">
          <p>пользователя c таким userId нет</p>
        </div>
      </div>
    );
  }

  return (
    <div className="userInfoPage">
      <h2>UserInfoPage</h2>

      <div className="users">
        <p>{user.jobTitle}</p>
        <p data-testid='email'>{user.email}</p>
        <img src={user.avatar} alt="" width={200} height={200} />
        <p data-testid='fullName'>{user.fullName}</p>
        <p>{user.bio}</p>
      </div>
      {user.playlist && (
        <div className="playlist-link">
          <p>{`playlist:`}</p>
		  <Link data-testid='playlist' to={`/playlist/${user.playlist.id}`} key={user.playlist.id}>
		  	{user.playlist.name}
		  </Link>
        </div>
      )}
    </div>
  );
}
