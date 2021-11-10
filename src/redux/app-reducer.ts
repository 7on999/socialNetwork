
import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type initialStateType = {
    initialized:boolean
}

type actionType = {
    type: typeof INITIALIZED_SUCCESS
}

let initialState:initialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action:actionType):initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export const initializedSuccess = ():actionType=>({ type:INITIALIZED_SUCCESS})

export const initializeApp = ()=> (dispatch:any) =>{
    dispatch(getAuthUserData())
    .then (()=>{
        dispatch(initializedSuccess())
    })
}

export default appReducer;