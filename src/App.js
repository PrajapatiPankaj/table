import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import GetUser from "./components/getuser";

function App() {
  return (
    <>
      <h2 className="comrender">App.js</h2>
      <hr />
      <div className="comrender">
        <Router>
          <Routes>
           <Route path="/" element={<GetUser />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
