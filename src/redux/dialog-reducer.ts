export const SEND_MESSAGE = 'SEND-MESSAGE';

export type sendMessageCreatorType = {
  type: typeof SEND_MESSAGE,
  newBodyMessage:string,
}

export const sendMessageCreator = (newBodyMessage:string):sendMessageCreatorType=>({type:SEND_MESSAGE, newBodyMessage});

type dialogsDataNameType = {
  id: number,
  name: string
}

type dialogsMessagesDataType = {
  id: number,
  message: string
}

type initialStateType = {
  dialogsData: Array<dialogsDataNameType>,
  messagesData: Array<dialogsMessagesDataType>,
}

const initialState:initialStateType ={
    dialogsData: [ 
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Ann'},
        {id: 3, name: 'Sam'},
        {id: 4, name: 'Petr'},
        {id: 5, name: 'Kate'},
        {id: 6, name: 'Sergey'},
    ],
    messagesData: [ 
      {id: 1, message: 'how are you'},
      {id: 2, message: 'what are you doing'},
      {id: 3, message: 'where are you from'},
      {id: 4, message: 'Yo'},
      {id: 5, message: 'Yoe'},
      {id: 6, message: 'Yo'},
  ],
}

const dialogReducer = (state=initialState, action:any):initialStateType => {
    switch(action.type) {
        case SEND_MESSAGE: {
        let newMessageDataEl = {
            id: 7,
            message:  action.newBodyMessage,
          };
          return {
              ...state,
              messagesData: [...state.messagesData, newMessageDataEl],
          };
        }
          default: return state;
    } 
}

export default dialogReducer;