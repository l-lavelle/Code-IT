import "./App.css";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/nav/NavigationBar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <div className="content">
        <NavigationBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
