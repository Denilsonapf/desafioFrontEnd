import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';


function ButtonToMAp(entrega){

    const dispactch = useDispatch();
      
    const history = useHistory();

    const handleMap = ()=>{
        dispactch(addRotaAction(entrega.cliente.pontoDestino, entrega.cliente.pontoPartida));
        history.push('./listar');
    };
            
    function addRotaAction(to, from){
        return{type: 'ADD_ROTA', from, to}
    }

    
    return(
       <IconButton
        onClick={handleMap}        
        ><LocationOnIcon fontSize="small" style={{ color: 'black' }} /></IconButton>
    )
}

export default ButtonToMAp;