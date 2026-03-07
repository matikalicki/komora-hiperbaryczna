import HyperO2Landing from "./HyperO2Landing";
import Blog from "./Blog";

export default function App() {
  const isBlog = window.location.pathname.includes("/blog");
  return isBlog ? <Blog /> : <HyperO2Landing />;
}