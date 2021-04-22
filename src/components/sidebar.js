import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });


function Sidebar(){

    const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const history = useHistory();
      
      const handleClickCadastrar = () => {
        history.push('/');
        };
    
        const handleClickExibir = () => {
            history.push('/exibir');
            };
    
    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          
         
          <List>
            
                <ListItem 
                label = "Cadastrar" 
                onClick={handleClickCadastrar}>
                <SaveIcon style={{ color: 'black' }} /> Cadastrar
                </ListItem>
                <Divider />
                <ListItem 
                label ="Entregas"
                onClick={handleClickExibir}>
                <DirectionsCarIcon /> Entregas
                </ListItem>
                <Divider />
            
              
           
          </List>
             
        </div>
      );
    
      return (
    
        
        
        <div>
          {['Menu'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
          </div>
      ) 
}

export default Sidebar;
