import "./navigation-bar.css";

type NavigationBarProps = {
  date: string;
}

export const NavigationBar = (props: NavigationBarProps) => {
  return (
    <div className="navigation-bar">
      <div className="side-bar">&lt;</div>

      <div className="main-bar ">
        <span className="main-bar-text">Today, {props.date}</span>
      </div>

      <div className="side-bar">&gt;</div>
    </div>
  );
};
