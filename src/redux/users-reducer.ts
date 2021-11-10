import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import {userAPI} from '../API/api';
import {userType} from '../types/types'
import {appStateType} from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS';


let initialState = {
    users: [ ] as Array<userType>,
    pageSize: 30 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
};

type initialStateType = typeof initialState;
const usersReducer = (state = initialState, action:actionType):initialStateType => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }
        case IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress:
                (action.isFetching) ? [...state.followingInProgress, action.userID]
                :state.followingInProgress.filter(id=>id!=action.userID)
            }
        }
        default:
            return state;
    }
}


type actionType = followSuccessType|unfollowSuccessType|setUsersType|
setCurrentPageType|setTotalUsersCountType|toggleIsFetchingType|toggleFollowingProgreType

type followSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId:number):followSuccessType => ({type: FOLLOW, userId })

type unfollowSuccessType = {
    type:typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId:number):unfollowSuccessType => ({type: UNFOLLOW, userId })

type setUsersType = {
    type: typeof SET_USERS
    users: Array<userType>
}
export const setUsers = (users: Array<userType>):setUsersType => ({type: SET_USERS, users })

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage:number
}
export const setCurrentPage = (currentPage:number):setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage })

type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT, 
    count: number
}
export const setTotalUsersCount = (totalUsersCount:number):setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type toggleIsFetchingType = {
    type: typeof IS_FETCHING
    isFetching:boolean
}
export const toggleIsFetching=(isFetching:boolean):toggleIsFetchingType=>({type:IS_FETCHING,isFetching})

type toggleFollowingProgreType = {
    type:typeof FOLLOWING_PROGRESS 
    isFetching:boolean 
    userID:number
}
export const toggleFollowingProgres=(isFetching:boolean, userID:number):toggleFollowingProgreType=> ({type:FOLLOWING_PROGRESS, isFetching, userID})

export const requestUser = (page:number, pageSize:number):ThunkAction<Promise<void>,appStateType,any,actionType>=>{
    return async (dispatch:any)=>{
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let response = await userAPI.getUser(page,pageSize);
             dispatch(toggleIsFetching(false));
             dispatch(setUsers(response.items));
             dispatch(setTotalUsersCount(response.totalCount));
    
  }
}


// export const flowUnfollow = async (userID, dispatch, userAPImethod, followUnfollowSuccess)=>{
    
//        dispatch(toggleFollowingProgres(true, userID));

      
//        let response = await userAPImethod(userID);
       
//             if (response.resultCode==0) {
//                 dispatch(followUnfollowSuccess(userID));
//             }
//             dispatch(toggleFollowingProgres(false, userID));
    
// }

// export const unfollow = (userID)=>{
//     return async (dispatch)=>{
//         let userAPImethod = userAPI.unfollowOnUser(userID).bind(userAPI);
//         let followUnfollowSuccess = unfollowSuccess;
//         flowUnfollow(userID, dispatch, userAPImethod, followUnfollowSuccess)
       
//     }
// }

// export const follow = (userID)=>{
//     return async (dispatch)=>{

//         let userAPImethod = userAPI.followOnUser(userID).bind(userAPI);
//         let followUnfollowSuccess = followSuccess;
//         flowUnfollow(userID, dispatch, userAPImethod, followUnfollowSuccess)

        
//     }
// }




export const unfollow = (userID:number)=>{
    return async (dispatch:Dispatch<unfollowSuccessType|toggleFollowingProgreType>, getState: ()=>appStateType)=>{
       dispatch(toggleFollowingProgres(true, userID));
       let response = await userAPI.unfollowOnUser(userID);
       
            if (response.resultCode==0) {
                dispatch(unfollowSuccess(userID));
            }
            dispatch(toggleFollowingProgres(false, userID));
    }
}

export const follow = (userID:number)=>{
    return async (dispatch:Dispatch<followSuccessType|toggleFollowingProgreType>, getState: ()=>appStateType)=>{
       dispatch(toggleFollowingProgres(true, userID));
       let response = await userAPI.followOnUser(userID)
      
            if (response.resultCode==0) {
                dispatch(followSuccess(userID));
            }
            dispatch(toggleFollowingProgres(false, userID));
        
    }
}




export default usersReducer;