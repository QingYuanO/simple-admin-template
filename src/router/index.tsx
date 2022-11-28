import { SmileFilled, CrownFilled } from '@ant-design/icons';
import { RouteObject } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    
    children: [
      {
        path: '/home',
        element: <Home />,
        index: true,
      },
      {
        path: '/about',
        element: <MyPage />,
      },
    ],
  },
];


export const menu = [
  
]