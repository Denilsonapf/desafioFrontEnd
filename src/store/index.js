import { createStore } from 'redux';


const initialState = {
    from: 'abc',
    to: ''
}


function rota(state = initialState, action){

    switch(action.type){
        case 'ADD_ROTA': 
            return{...state, from:action.from, to: action.to}
        default:
            return state    
    }
}

const store = createStore(rota);

export default store;