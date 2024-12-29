import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentList } from "./components/StudentList";
import { AddStudent } from "./pages/AddStudent";
import { EditStudent } from "./pages/EditStudent";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
