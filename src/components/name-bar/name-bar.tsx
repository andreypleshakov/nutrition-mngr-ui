import bellIcon from "../../assets/icons/bell-icon.svg";
import gearIcon from "../../assets/icons/gear-icon.svg";
import "./name-bar.css";

export const NameBar = () => {
  return (
    <div className="name-bar">
      <div className="name-and-pic">
        <div className="profile-pic" />
        <span className="name">Andrey Pleshakov</span>
      </div>

      <div className="functional-buttons">
        <img src={bellIcon} alt="bell icon" />
        <img src={gearIcon} alt="gear icon" />
      </div>
    </div>
  );
};
