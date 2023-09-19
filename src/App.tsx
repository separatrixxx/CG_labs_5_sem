import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import Lab1 from './pages/Lab1';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/lab1' element={<Lab1 />} />
      </Routes>
    </Router>
  );
}
