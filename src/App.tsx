import { useEffect } from "react";
import "./App.css";
// import { Header } from "./components/header/header";
import { NameBar } from "./components/name-bar/name-bar";

function App() {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    tg.ready();
  });

  return (
    <div className="App">
      <NameBar />
    </div>
  );
}

export default App;
