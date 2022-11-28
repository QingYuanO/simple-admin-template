import { Outlet, Route, Routes } from 'react-router-dom';
import CustomLayout from './layout';
import Home from './pages/Home';
import MyPage from './pages/MyPage';

function App() {
  return (
    <CustomLayout>
      <Outlet/>
    </CustomLayout>
  );
}

export default App;
