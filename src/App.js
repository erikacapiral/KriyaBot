import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegularEmployee from './views/layout/RegularEmployee';
import PerformanceManagement from './views/pages/PerformanceManagement';
import Login from './views/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<RegularEmployee />}>
          <Route path="/performance-management" element={<PerformanceManagement />} />
        </Route> */}

        <Route path='/login' element={<Login />} />
        <Route path="/" element={<RegularEmployee />}>
          <Route path="/performance-management" element={<PerformanceManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
