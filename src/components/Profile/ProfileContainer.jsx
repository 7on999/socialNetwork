import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';



class ProfileContainer extends React.Component  {

refresh() {
  let userID=this.props.match.params.userID;
  if (!userID) {
  userID=this.props.authorizedUserId;
  }
  if (!userID){
    this.props.history.push('/login')
  }
  this.props.getUsersProfile(userID);
  this.props.getStatus(userID);
}

 componentDidMount() {
    this.refresh()
}

componentDidUpdate(prevProps) {
  if (this.props.match.params.userID!=prevProps.match.params.userID)
  this.refresh()
}
       
  render () {
    return <Profile {...this.props} isOwner = {!this.props.match.params.userID}profile = {this.props.profile} 
    status={this.props.status} updateStatus = {this.props.updateStatus} saveProfile={this.props.saveProfile}
    savePhoto = {this.props.savePhoto}/>
 }
}


let mapStateToProps=(state) =>{
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
  })
}



export default compose (
    connect (mapStateToProps, {getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)
(ProfileContainer)