import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
