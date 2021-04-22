import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import api from '../services/api';
import Sidebar from '../components/sidebar';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import './cadastrar.css';





function Cadastrar() {

  const [nome, setNome] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
      
  async function handleSubmit(e){
    if(nome===''|| pontoPartida===''|| pontoDestino===''|| !dataEntrega) return alert('É necessário preencher todos os dados!')
    e.preventDefault();
  
   await api.post('/cadastro', {
      nome,
      dataEntrega,
      pontoPartida,
      pontoDestino,
    })
      
    setNome('');
    setDataEntrega('');
    setPontoPartida('');
    setPontoDestino('');
  }


 



 

  return (

    
    <div>
      <div>
        <Sidebar />
      </div>

      
      <div>
        <center>
          <strong>Cadastro de Entregas</strong>
          <form onSubmit = {handleSubmit}>
            <div class = "input-group">
              <div class ="textField-block">
                  <TextField
                  label="Nome"
                  id="nome"
                  value={nome}
                  required
                  variant="outlined"
                  onChange={e => setNome(e.target.value)}
                  />
              </div>
              <div class="textField-block">
                <TextField 
                variant="outlined"
                id="dataEntrega"
                type="date"
                value={dataEntrega}
                onChange={e => setDataEntrega(e.target.value)}
                required
                />
              </div>
              <div class ="textField-block">
                <TextField
                    label="Endereço de partida"
                    id="pontoPartida"
                    value={pontoPartida}
                    required
                    variant="outlined"
                    onChange={e => setPontoPartida(e.target.value)}
                  />
              </div>

              <div class ="textField-block">
                <TextField
                    label="Endereço de chegada"
                    id="pontoDestino"
                    value={pontoDestino}
                    required
                    variant="outlined"
                    onChange={e => setPontoDestino(e.target.value)}
                  />
              </div>
              <div className="input-button">
                <div id="button">
                  <IconButton
                  type="submit"
                  onClick={handleSubmit}
                  style={{ color: 'black' }}
                  >
                    <SaveIcon style={{ color: 'black' }} />
                    Cadastrar
                  
                  </IconButton>
                </div> 
              </div>
            </div>
          </form>
        </center>
      </div>
      
      
    </div>
    
  );
}

export default Cadastrar;