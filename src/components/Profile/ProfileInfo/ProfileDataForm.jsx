import { Field, reduxForm } from 'redux-form';
import React from 'react';
import {Input, Textarea} from '../../common/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';

const ProfileDataForm = (props)=>{
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {props.error && <div className={s.formSummaryError}>
            {props.error}
        </div>
        }
            <div>
                <b>Full name</b>
                <Field name="fullName" component={Input} placeholder='full name'/>
            </div>
            <div>
               <b> Ищу работу:</b>  
               <Field name="lookingForAJob" component={Input} type='checkbox' placeholder='lookForJob'/>
            </div>
            <div>
            <b> description of my skills</b>
                <Field name="lookingForAJobDescription" component={Textarea} placeholder='description of skills'/>
            </div>
            <div>
            <b> about me</b>
                <Field name="aboutMe" component={Textarea} placeholder='aboutMe'/>
            </div>

            <div> 
            <b> Contacts: </b> {Object.keys(props.profile.contacts).map (key=>{
                return (<div className={s.contact} key={key}>
                          <b>{key}:</b> <Field name={'contacts.'+ key} component={Input} placeholder={key}/>
                        </div>)
                })}  
                
            </div>
            
            
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({
    form:'profile-edit'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;
