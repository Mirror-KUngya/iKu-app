import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {MainPage} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
