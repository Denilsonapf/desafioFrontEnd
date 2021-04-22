import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../services/api';
import { format, parseISO } from 'date-fns';
import ButtonToMap from '../components/buttonToMap';
import Sidebar from '../components/sidebar';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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




export default function Exibir() {

  const[deliveries,setDeliveries] = useState([]);
  const classes = useStyles();
  
  useEffect(()=> {
  async function loadEntregas(){
    const response = await api.get('/entregas');

    setDeliveries(response.data);
    
  }
  loadEntregas();
},[]);


  function parseDate(date){
    const parseIso = parseISO(date);
    const dateFormated = format(parseIso, " dd '/' MM' / 'yyyy");
   return dateFormated;
  
  }
  
  return (
    <div>
      <Sidebar />
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="center">Data de Entrega</StyledTableCell>
            <StyledTableCell align="left">Ponto de Partida</StyledTableCell>
            <StyledTableCell align="left">Ponto de Chegada</StyledTableCell>
            <StyledTableCell align="center">Rota</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveries.map((row) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {row.nome}
              </StyledTableCell>
              <StyledTableCell align="center">{parseDate(row.dataEntrega)}</StyledTableCell>
              <StyledTableCell align="left">{row.pontoPartida}</StyledTableCell>
              <StyledTableCell align="left">{row.pontoDestino}</StyledTableCell>
              <StyledTableCell align="center"><ButtonToMap cliente={row}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
    
  );
}
