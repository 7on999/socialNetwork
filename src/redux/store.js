import profileReducer from './profile-reducer';
import dialogReducer from './dialog-reducer.ts';
import sidebarReducer from './sidebar-reducer';


let store = {
   _state : {
    profilePage: {
        posts: [ 
             {id: 1, message: 'Hello everythink. It is my first post', likeCounter: 15},
             {id: 2, message: 'It is time go to bed',  likeCounter: 27},  
              {id: 2, message: 'It is time go to bed',  likeCounter: 27},  
              {id: 2, message: 'It is time go to bed',  likeCounter: 27}, 
            ],
            newPostText: 'itk',
  }, 
           dialogsPage: {
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
          newBodyMessage: '',

  },
  sidebar: {
  }     
},
_callSubscriber () {
  console.log ('state changed');
},

  getState() {
   
  return this._state
},
subscribe (observer) {
  this._callSubscriber = observer;
},

dispatch (action)  {
 
  this._state.profilePage = profileReducer(this._state.profilePage, action);
  this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
  this._state.sidebar = sidebarReducer (this._state.sidebar, action);
  this._callSubscriber (this._state);
},
}

export default store;

window.store=store;


