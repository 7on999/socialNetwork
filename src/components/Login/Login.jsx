import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer.ts';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControls/FormsControls.module.css';

const LoginForm = ({handleSubmit, error, captchaUrl})=>{
    return (
    <form onSubmit={handleSubmit}>
        
        <div>
            <Field placeholder={'email'} name = {'email'} component = {Input} validate = {[required]}/>
        </div>
        <div>
            <Field placeholder={'password'} name = {'password'} component={Input} 
            type = {'password'} validate = {[required]}/>
        </div>
        <div>
            <Field type ='checkbox' name = {'rememberMe'} component={Input} validate = {[required]} /> remember me
        </div>
        
        {error && <div className={s.formSummaryError}>
            {error}
        </div>
        }
        {captchaUrl&&<img src={captchaUrl}/>}
        {captchaUrl&&<Field placeholder={'write symbols'} name = {'captcha'} 
        component={Input} validate = {[required]}/>}
        <div>
            <button> log in </button>
        </div>
    </form>)
}

let LoginReduxForm=reduxForm({
    form: 'login'
}) (LoginForm)

const Login = (props)=>{

   const onSubmit=(formData)=>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
    <h1>LOGIN</h1>
    <LoginReduxForm captchaUrl ={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
    )
}

const mapStateToProps = (state)=>({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

export default connect (mapStateToProps, {login})(Login);