import "./App.css";
import NavigationBar from "./components/nav/NavigationBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./bootstrap/dist/css/bootstrap.min.css";
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
