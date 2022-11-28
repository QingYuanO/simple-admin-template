import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-layout';
import { ProProvider } from '@ant-design/pro-provider';
import { PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProps from './_defaultProps';

const CustomLayout = ({ children }: PropsWithChildren<{}>) => {
  const [pathname, setPathname] = useState('/home');

  const navigate = useNavigate();

  return (
    <div
      id='test-pro-layout'
      style={{
        height: '100vh',
      }}
    >
      <ProProvider.Provider
        value={{
          hashed: false,
        }}
      >
        <ProLayout
          layout='mix'
          siderWidth={216}
          {...defaultProps}
          location={{
            pathname,
          }}
          menu={{
            collapsedShowGroupTitle: true,
          }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮',
          }}
          actionsRender={props => {
            if (props.isMobile) return [];
            return [
              <InfoCircleFilled key='InfoCircleFilled' />,
              <QuestionCircleFilled key='QuestionCircleFilled' />,
              <GithubFilled key='GithubFilled' />,
            ];
          }}
          fixSiderbar
          fixedHeader
          // headerRender={() => {
          //   return <div>resrs</div>;
          // }}
          headerTitleRender={(logo, title, _) => {
            const defaultDom = (
              <a>
                {logo}
                {title}
              </a>
            );
            if (document.body.clientWidth < 1400) {
              return defaultDom;
            }
            if (_.isMobile) return defaultDom;
            return <>{defaultDom}</>;
          }}
          menuFooterRender={props => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12,
                }}
              >
                <div>© 2021 Made with love</div>
                <div>by Ant Design</div>
              </div>
            );
          }}
          onMenuHeaderClick={e => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                console.log(item);
                const changedPath = item.path || '/';
                navigate(changedPath);
                setPathname(changedPath);
              }}
            >
              {dom}
            </div>
          )}
        >
          <PageContainer>{children}</PageContainer>
        </ProLayout>
      </ProProvider.Provider>
    </div>
  );
};

export default CustomLayout;
