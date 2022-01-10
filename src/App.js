import "./App.css";
import Page from "./page";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Mob from "./mob";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Page />} exact={true} />
          <Route path="/mobile" element={<Mob />} exact={true} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
