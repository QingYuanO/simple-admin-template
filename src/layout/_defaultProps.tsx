import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';

const defaultProps = {
  route: {
    routes: [
      {
        path: '/home',
        name: '主页',
        icon: <SmileFilled />,
      },
      {
        path: '/about',
        name: '管理页',
        icon: <CrownFilled />,
        access: 'canAdmin',
      },
    ],
  },
};
export default defaultProps;
