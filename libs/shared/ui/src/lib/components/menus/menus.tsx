import styles from './menus.module.scss';
import { useContext, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WalletIcon from '@mui/icons-material/Wallet';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppContext from '../../contexts/AppContext';

/* eslint-disable-next-line */
export interface MenusProps { }

export function Menus(props: MenusProps) {

  const context = useContext(AppContext)

  const [clickedIcons, setClickedIcons] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleIconClick = (index: any) => {
    setClickedIcons((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const menusData = [
    {
      type: 'Manage masters',
      icon: <WalletIcon />,
      titleArray: [
        {
          title: 'Roles',
        },
        {
          title: 'Categories',
        }
      ],
    },
    {
      type: 'Your goals',
      icon : <SportsScoreIcon />
    },
    {
      type: 'Setting',
      icon : <SettingsIcon />,
      titleArray: [
        {
          title: 'Account',
        },
        {
          title: 'Notification',
        },
        {
          title: 'App language',
        }
      ],
    },
    {
      type: 'Manage',
      icon : <ManageSearchIcon />,
      titleArray: [
        {
          title: 'Manage Categories',
        },
        {
          title: 'Manage Roles',
        }
      ],
    }
  ];

  const manageClickHandler = (titleObj) => {
    console.log(titleObj.title)
    context.setManage(titleObj?.title)
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.menus_container}>
        <div>
          {menusData.map((data, index) => {
            const isClickedIcon = clickedIcons[index] || false;

            return (
              <div key={index}>
                <div className={styles.types}>
                  <div className={styles.icon_and_type}>
                    <div className={styles.menus_icons}>{data.icon}</div>
                    <h1 className={styles.menus_type}>{data.type}</h1>
                  </div>
                  {data?.titleArray && data?.titleArray?.length > 0 && (
                    <div className={styles.arrows}>
                    <div>
                      <div onClick={() => toggleIconClick(index)}>
                        {!isClickedIcon ? (
                          <KeyboardArrowUpIcon className={styles.keyboard_icon} />
                        ) : (
                          <KeyboardArrowDownIcon
                            className={styles.keyboard_icon}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  )}
                  
                </div>
                <div className={styles.menus_title_container}>
                  {data?.titleArray?.map((titles: any, index: number) => {
                    return (
                      <div className={`${styles.check_and_name} ${isClickedIcon ? styles.open : ''}`}
                        key={index}>
                        <h1 onClick={()=>manageClickHandler(titles)} className={styles.titles}>{titles.title}</h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Menus;
