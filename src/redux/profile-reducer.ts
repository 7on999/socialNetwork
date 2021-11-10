import {userAPI} from '../API/api';
import {profileAPI} from '../API/api';
import {stopSubmit} from 'redux-form';
import {PostType, contactsType, photosType, ProfileType } from '../types/types';
export const ADD_POST = 'itk/profile-reducer/ADD-POST';
export const  SET_USERS_PROFILE = 'SET-USERS-PROFILE';
export const SET_STATUS = 'SET-STATUS';
export const DELETE_POST = 'DELETE-POST';
export const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';



type initialStateType = typeof initialState;

let initialState = {
    posts: [ 
        {id: 1, message: 'Hello everythink. It is my first post', likeCounter: 15},
        {id: 2, message: 'It is time go to bed',  likeCounter: 27},  
         {id: 3, message: 'It is time go to bed',  likeCounter: 27},  
         {id: 4, message: 'It is time go to bed',  likeCounter: 27}, 
       ] as Array<PostType>,
       profile: null as ProfileType | null,
       status: '' as string,

}

const profileReducer = (state:initialStateType=initialState, action:any):initialStateType  => {

    switch (action.type) {
        case ADD_POST : {
           let newPost = {
                id: 5,
                message:  action.newPostText,
                likeCounter: 0,
              };

              return {
                  ...state,
                  posts:[...state.posts, newPost], 
              };
            }
        
        // case UPDATE_NEW_POST_TEXT:{
        //     return {
        //         ...state,
        //         newPostText: action.newText,
        //     };
        // }
        case SET_USERS_PROFILE: {
             return {
                 ...state,
                    profile: action.profile,
             }
        }
        case SET_STATUS: {
            return {
                ...state,
                status:action.status,
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p=>p.id!=action.postId)
            }
        }
        //////////////////////////////////////////
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos:action.photo} as ProfileType
            }
        }
            default: return state;       
    }
}

type deletePostType = {
    type: typeof DELETE_POST,
    postId:number
}
export const deletePost=(postId:number):deletePostType=>({type:DELETE_POST,postId});

type addPostActionCreatorType = {
    newPostText:string,
    type:typeof ADD_POST
}
export const addPostActionCreator=(newPostText:string):addPostActionCreatorType => ({type:ADD_POST,newPostText});


type savePhotoSuccessType = {
    type:typeof SAVE_PHOTO_SUCCESS,
    photo: photosType
}

export const savePhotoSuccess = (photo:photosType)=>({type:SAVE_PHOTO_SUCCESS, photo})

type setUsersProfile = {
    type:typeof SET_USERS_PROFILE,
    profile: ProfileType
}
export const setUsersProfile = (profile:ProfileType):setUsersProfile=> ({
    type:SET_USERS_PROFILE, profile
})


type setStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status:string):setStatusType=>({
    type:SET_STATUS, status
})

export const getUsersProfile= (userID:number)=>{
    return async (dispatch:any)=>{
       let response= await userAPI.getProfile(userID);
     dispatch(setUsersProfile(response.data));
    }
}

export const savePhoto = (file:photosType)=>{
    return async (dispatch:any)=>{
        let response = await profileAPI.loadPhoto(file);
        if (response.data.resultCode===0){
        dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const getStatus = (userID:number)=>{
    return async (dispatch:any)=>{
        let response = await profileAPI.getStatus(userID);
       
            dispatch(setStatus(response.data));
        
    }
}

export const updateStatus = (status:string)=>{
    return async (dispatch:any)=>{
        try{
        let response = await profileAPI.updateStatus(status);
        
            if (response.data.resultCode===0){
                dispatch(setStatus(status));
         }
        }catch(error){
            alert('mistake in update of status')
        }
    }
}
export const saveProfile = (profile:ProfileType)=>{
    return async (dispatch:any, getState:any, error:any)=>{
         const userId = getState().auth.userId;
        const response = await profileAPI.updateChangesProfile(profile);
            if (response.data.resultCode===0){
               dispatch(getUsersProfile(userId))
            } else {
                dispatch(stopSubmit('profile-edit', {_error: response.data.messages[0]}));
                return Promise.reject(response.data.messages[0]);
            }
}
}

export default profileReducer;


