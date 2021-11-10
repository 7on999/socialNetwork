import React from 'react';
import {User} from './User';
import Paginator from '../../common/Paginator/Paginator';
import {userType} from '../../../types/types';


type UsersPropsType = {
    currentPage:number,
    onPageChanged:(p:number)=>void
    totalUsersCount:number
    pageSize:number
    unfollow:(id:number)=> void
    follow: (id:number)=> void
    followingInProgress: Array<number>
    users: Array<userType>
    
}
let Users:React.FC<UsersPropsType>=(props) => {

    return <div>
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
        totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} />
        {
            props.users.map(u => < User key={u.id} user={u} followingInProgress={props.followingInProgress}
               unfollow={props.unfollow} follow={props.follow} />)
        }
    </div>
}

export default Users;