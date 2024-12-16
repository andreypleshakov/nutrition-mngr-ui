import bellIcon from "../../assets/icons/bell-icon-white.svg";
import gearIcon from "../../assets/icons/gear-icon-white.svg";
import "./name-bar.css";

export const NameBar = () => {
  const tg = window.Telegram.WebApp;

  return (
    <div className="name-bar">
      <div className="name-and-pic">
        <img
          src={tg.initDataUnsafe.user?.photo_url}
          alt="pic"
          className="profile-pic"
        />
        <span className="name">{tg.initDataUnsafe.user?.first_name}</span>
      </div>

      <div className="functional-buttons">
        <img src={bellIcon} alt="bell icon" />
        <img src={gearIcon} alt="gear icon" />
      </div>
    </div>
  );
};
