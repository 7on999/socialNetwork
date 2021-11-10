import React from 'react';
import Dialogs from './Dialogs';
import { sendMessageCreator } from '../../redux/dialog-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {compose} from 'redux';


let mapStateToProps = (state)=>{
    return {
        newBodyMessage:state.dialogsPage.newBodyMessage,
        messagesData:state.dialogsPage.messagesData,
        dialogsData: state.dialogsPage.dialogsData,
    }
};

let mapDispatchToProps=(dispatch)=>{
    return {
        sendMessage:(newMessageBody)=> { 
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs)