import styles from './menus.module.scss';
import { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppContext from '../../contexts/AppContext';

/* eslint-disable-next-line */
export interface MenusProps { }

export function Menus(props: MenusProps) {

  const context = useContext(AppContext)

  const menusData = [
    {
      type: 'Your goals',
      icon: <SportsScoreIcon />
    },
    {
      type: 'Manage',
      icon: <ManageSearchIcon />,
      titleArray: [
        {
          title: 'Manage Categories',
        },
        {
          title: 'Manage Roles',
        },
        {
          title: 'Manage Users',
        }
      ],
    },
    {
      type: 'Setting',
      icon: <SettingsIcon />,
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
    }
  ];

  const manageClickHandler = (titleObj : any , event : any) => {
    event.stopPropagation();
    context.setManage(titleObj?.title)
  }

  return (
    <div className={styles.container}>
      <div className={styles.menus_container}>
        {menusData.map((data, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={data?.titleArray && data?.titleArray?.length > 0 && (<ExpandMoreIcon />)}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Typography>{data.icon}</Typography>
                <Typography>{data.type}</Typography>
              </div>
            </AccordionSummary>

            {data?.titleArray?.map((titles, index) => (
              <AccordionDetails key={index}>
                <Typography onClick={(event) => manageClickHandler(titles , event)} style={{cursor:'pointer'}}>{titles.title}</Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Menus;
