import styles from './FilterContainer.module.scss';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export interface FilterContainerProps {
  inputDataForSearchField?: any;
  onSearch: () => void;
  open: any;
  handleClose: any;
  anchorEl: any;
}

export function FilterContainer({ inputDataForSearchField, onSearch, open, handleClose, anchorEl }: FilterContainerProps) {
  return (
    <Popper
      sx={{
        zIndex: 1,
        width: '66.3rem',
      }}
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <div className={styles.filterContainer}>
                <div className={styles.searching}>
                  <h1 className={styles.headings}>Search By</h1>
                  {inputDataForSearchField.map((data: any, index: number) => (
                    <div className={styles.input_field_section} key={index}>
                      <h2>{data.label}</h2>
                      <input
                        type="text"
                        placeholder={`Enter the ${data.label}`}
                        className={styles.search_inputs}
                        onChange={(e) => data.setSearch(e.target.value)}
                      />
                    </div>
                  ))}
                  <Button onClick={onSearch} variant="contained" size="small" sx={{ mt: 1 }}>
                    Search
                  </Button>
                </div>
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
