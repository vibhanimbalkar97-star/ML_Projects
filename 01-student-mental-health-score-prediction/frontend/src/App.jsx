import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";


function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </div>
  );
}

export default App;
