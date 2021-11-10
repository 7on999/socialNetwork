import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';


const Dialogs = (props) => {

    let dialogsElement = props.dialogsData
.map( dialog=> <Dialog name = {dialog.name} key={dialog.id} id = {dialog.id}/> );

  
    let messagesElements = props.messagesData
.map (message=> <Message content = {message.message} key={message.id} />);



const addNewMessage=(values)=>{
    props.sendMessage(values.newMessageBody);
}
    if (!props.isAuth) {return <Redirect to='/login' />}
    return (
        <div className= {s.dialogs}>
           <div className = {s.dialogItems}> 
            { dialogsElement }
           </div>

           <div className = {s.messages}>  {messagesElements} </div>
           <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    )
}
const maxLength100 = maxLengthCreator(100);

const AddMessageForm = (props)=>{
    return (
        <form onSubmit={props.handleSubmit}> 
            <div>
                <Field name={'newMessageBody'} component={Textarea}
                validate = {[required, maxLength100]} placeholder='write your message'/> 
            </div>
            <div>
                <button> click for send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({
    form:'dialogAddMessageReduxForm'
}) (AddMessageForm)


export default Dialogs;