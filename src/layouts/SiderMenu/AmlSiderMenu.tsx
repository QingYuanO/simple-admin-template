import { MenuDataItem } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useEffect, useState } from 'react';

const activeStyle = 'bg-[#fff] border-l-4 border-[#3C8DBC] text-[#333]';
const activeHoverStyle =
  'hover:bg-[#fff] hover:border-l-4 hover:border-[#3C8DBC] hover:text-[#333]';
const itemCommonClass = 'h-[30px] cursor-pointer pl-4 leading-[30px]';

export default function AmlSiderMenu(props: any) {
  // console.log(props);
  const { menuData, matchMenuKeys } = props as {
    menuData: MenuDataItem[];
    location: Location;
    matchMenuKeys: string[];
  };

  const [activeRoutes, setActiveRoutes] = useState<MenuDataItem[]>([]);
  const [parentKey, setParentKey] = useState('');
  const [activeName, setActiveName] = useState('');

  useEffect(() => {
    setParentKey(matchMenuKeys[0]);
    const initRoute = menuData.find((item) => item.path === matchMenuKeys[0]);
    setActiveRoutes(initRoute?.children ?? []);
    setActiveName(initRoute?.name ?? '');
  }, [matchMenuKeys]);

  function onChangeRoute(path: string) {
    const activeRoute = menuData.find((item) => item.path === path);
    setActiveRoutes(activeRoute?.children ?? []);
    setActiveName(activeRoute?.name ?? '');
    setParentKey(path);
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-[#262F3E] text-[#F0F0F0]">
        <div className="flex-center h-[100px] bg-[rgb(20_32_48)]">LOGO</div>
        {menuData?.map((item) => (
          <div
            key={item.path}
            className={`${itemCommonClass} ${activeHoverStyle} ${
              parentKey === item.path ? activeStyle : ''
            }`}
            onClick={() => onChangeRoute(item.path!)}
          >
            <span>{item.icon}</span>
            <span className="ml-[5px]">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-[#F0F0F0] text-[#555]">
        <div className="ml-5 flex h-[100px] items-center text-[14px]">{activeName}</div>
        <div>
          {activeRoutes?.map((item) => (
            <div
              key={item.path}
              className={`${itemCommonClass} hover:border-t hover:border-b hover:border-[#D7D7D7] hover:bg-white ${
                matchMenuKeys.includes(item.path!)
                  ? 'border-t border-b border-[#D7D7D7] bg-white'
                  : ''
              }`}
              onClick={() => {
                if (item.path && item.path !== location.pathname) {
                  history.push(item.path);
                }
              }}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
