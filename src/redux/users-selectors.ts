import {createSelector} from 'reselect';
 import {appStateType} from './redux-store'


// const getUsersSelector = (state)=>{
//     return state.usersPage.users;
// }

// export const getUsers = createSelector(getUsersSelector,
//     (users)=>{
//         users.filter(u=>true);
//     })

export const getUsers = (state:appStateType)=>{
    return state.usersPage.users;
}

export const getPageSize = (state:appStateType)=>{
    return state.usersPage.pageSize;
}

export const getTotalUsersCount=(state:appStateType) =>{
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage=(state:appStateType) =>{
    return state.usersPage.currentPage;
}

export const getFollowingInProgress =(state:appStateType)=>{
    return state.usersPage.followingInProgress;
}

export const getIsFetching=(state:appStateType)=>{
    return state.usersPage.isFetching;
}