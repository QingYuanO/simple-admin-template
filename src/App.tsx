import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className='App'>
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
