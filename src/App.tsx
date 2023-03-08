import Footer from '@/components/Footer';
import AmlSiderMenu from '@/layout/SiderMenu/AmlSiderMenu';
import { DownOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons';
import { SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, Link, RunTimeLayoutConfig } from '@umijs/max';
import { ConfigProvider, Space, theme } from 'antd';
import moment from 'moment';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
// const WEEK = ['日', '一', '二', '三', '四', '五', '六', '日'];
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    collapsed: false,
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    layout: 'side',
    actionsRender: false,
    pageTitleRender: false,
    collapsedButtonRender: false,
    rightContentRender: false,
    itemRender: false,
    breadcrumbRender: false,
    siderWidth: 280,
    menuHeaderRender: false,
    colorPrimary: '#1890ff',
    menuContentRender(props) {
      console.log(props);
      return <AmlSiderMenu {...props} />;
    },
    footerRender: () => <Footer />,

    onMenuHeaderClick: () => {},
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    contentStyle: { backgroundColor: '#fff' },
    className: 'aml-theme',
    token: {
      bgLayout: '#fff',
      pageContainer: {
        colorBgPageContainer: '#fff',
      },
    },

    childrenRender: (children, props) => {
      console.log(props);

      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <ConfigProvider
            // componentSize="middle"
            theme={{
              token: {
                colorPrimary: '#3c8dbc',
                borderRadius: 2,
                paddingContentVertical: 0,
              },
              algorithm: [theme.compactAlgorithm],
              components: {
                Table: {},
                // Button: {},
              },
            }}
          >
            <div className="box-border flex h-10 w-full items-center justify-end border-b border-t border-solid border-gray-200 pr-10 pl-2 text-[12px] text-[#333] ">
              <div style={{ marginRight: 10 }}>
                今天是{moment().format('YYYY年MM月DD日')}，星期一
                {/* {moment().isoWeekday()} */}
              </div>
              <AvatarDropdown menu>
                <Space style={{ cursor: 'pointer' }} align="center">
                  <UserOutlined />
                  <AvatarName />
                  <DownOutlined />
                </Space>
              </AvatarDropdown>
              {/* <SelectLang/> */}
            </div>
            {children}
          </ConfigProvider>

          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
