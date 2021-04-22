import {BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Cadastrar from './pages/cadastrar';
import Exibir from './pages/exibir';
import Listar from './pages/maps';



export default function Routes(){
    return(

        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Cadastrar}/>
                <Route path="/exibir" component={Exibir}/>
                <Route path="/listar" component={Listar}/>
            </Switch>
        </BrowserRouter>

        
    )
}