import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import Lab1 from './pages/Lab1';
import Lab2 from "./pages/Lab2";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/lab1' element={<Lab1 />} />
        <Route path='/lab2' element={<Lab2 />} />
      </Routes>
    </Router>
  );
}
