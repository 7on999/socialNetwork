import React from 'react';
import { follow, unfollow, setCurrentPage, setTotalUsersCount, requestUser} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users/Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getFollowingInProgress, getIsFetching} from '../../redux/users-selectors'
import {userType} from '../../types/types'
import {appStateType} from '../../redux/redux-store'

type PropsType = {
  currentPage:number
   pageSize:number
   requestUser: (currentPage:number, pageSize:number)=>void
   setCurrentPage: (pageNumber:number)=>void
   isFetching:boolean
   totalUsersCount:number
  users: Array<userType>
  unfollow:(id:number)=> void
  follow: (id:number)=> void
  followingInProgress: Array<number>
}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUser(currentPage, pageSize)
  }

  onPageChanged = (pageNumber:number) => {
    const {pageSize} = this.props;
      this.props.setCurrentPage(pageNumber);
      this.props.requestUser(pageNumber, pageSize)
  }

  render() {
      return <> {this.props.isFetching? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                              pageSize={this.props.pageSize}
                              currentPage={this.props.currentPage}
                              onPageChanged={this.onPageChanged}
                              users={this.props.users}
                              follow={this.props.follow}
                              unfollow={this.props.unfollow}
                              followingInProgress={this.props.followingInProgress}
                            
      />
      </>
  }
}

// let mapStateToProps = (state) => {
//   return {
//       users: state.usersPage.users,
//       pageSize: state.usersPage.pageSize,
//       totalUsersCount: state.usersPage.totalUsersCount,
//       currentPage: state.usersPage.currentPage,
//       isFetching: state.usersPage.isFetching,
//       followingInProgress: state.usersPage.followingInProgress,
//   }
// } 

const mapStateToProps = (state:appStateType) => {
  return {
    users: getUsers(state),
    pageSize:getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage:getCurrentPage(state),
    followingInProgress: getFollowingInProgress(state),
    isFetching: getIsFetching(state),
  }
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//       follow: (userId) => {
//           dispatch(followAC(userId));
//       },
//       unfollow: (userId) => {
//           dispatch(unfollowAC(userId));
//       },
//       setUsers: (users) => {
//           dispatch(setUsersAC(users));
//       },
//       setCurrentPage: (pageNumber) => {
//           dispatch(setCurrentPageAC(pageNumber));
//       },
//       setTotalUsersCount: (totalCount) => {
//           dispatch(setUsersTotalCountAC(totalCount))
//       },
//       toggleIsFetching: (isFetching)=>{
//         dispatch(setIsFetchingAC(isFetching))
//       }
//   }
// }

export default compose (
  connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, setTotalUsersCount, requestUser
  })
)
(UsersContainer)
