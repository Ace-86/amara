import Controller from "./components/Controller";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import Tasks from "./components/Tasks";


function App() {
  return (
    <Router>
      <div className="App">
       
        {/* add routes here */}
        <Routes>
          <Route path="/" element={<Controller />} />
          <Route path="/tasks" element={<Tasks />} />
          {/* Routes To Add: app menu (parent to all app components), budget, calendar */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
