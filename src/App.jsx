import HyperO2Landing from "./HyperO2Landing";
import Blog from "./Blog";
import Rezerwacja from "./Rezerwacja";
import Admin from "./Admin";

export default function App() {
  const path = window.location.pathname;
  if (path.includes("/blog")) return <Blog />;
  if (path.includes("/rezerwacja")) return <Rezerwacja />;
  if (path.includes("/admin")) return <Admin />;
  return <HyperO2Landing />;
}
