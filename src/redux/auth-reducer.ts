import { stopSubmit } from 'redux-form';
import {authAPI} from '../API/api';
import {securituAPI} from '../API/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS='GET-CAPTCHA-URL-SUCCESS';

export type initialStateType = {
    userId: null|number,
    email: null|string,
    login: null|string,
    isAuth: boolean,
    captchaUrl:null|string,
}
let initialState:initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null,
};

const authReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
            case GET_CAPTCHA_URL_SUCCESS: 
            return {
                ...state,
                captchaUrl:action.captchaUrl,
            }

        default:
            return state;
    }
}

type dataInsetAuthUserData={
    userId:number|null, 
    email:string|null, 
    login:string|null, 
    isAuth:boolean,
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA,
    data: dataInsetAuthUserData
}
export const setAuthUserData = (userId:number|null, email:string|null, login:string|null, isAuth:boolean):setAuthUserDataType => {
    return {
        type: SET_USER_DATA, 
        data: {userId, email, login, isAuth}
    }  
}

export type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl:string
}

export const getCaptchaUrlSuccess=(captchaUrl:string):getCaptchaUrlSuccessType=>{
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    }
}

export const getAuthUserData = ()=>{
    return async (dispatch:any)=>{
       let response = await authAPI.me();
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
      
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha: any)=>{
    return async (dispatch:any)=>{
        let response = await authAPI.login(email, password, rememberMe, captcha);
   
            if(response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                if(response.data.resultCode === 10) {
                    dispatch(getCaptcha());
                } 
                let message = response.data.messages.length>0? response.data.messages[0] : 'some error';
                dispatch(stopSubmit('login', {_error: message}))
            }
        
    }
}

export const logout = ()=>{
    return async (dispatch:any)=>{
       let response= await authAPI.logout();
      
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            
        }
    }
}

export const getCaptcha = ()=>{
    return async (dispatch:any)=>{
        let captchaUrl = await securituAPI.getCaptcha();
        dispatch(getCaptchaUrlSuccess(captchaUrl.data.url))
    }
}


export default authReducer;

