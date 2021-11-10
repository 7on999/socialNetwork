import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo'
const Profile = (props) => {
 return    (
  <div>
<ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} profile = {props.profile} isOwner={props.isOwner} updateStatus={props.updateStatus} status = {props.status} />
<MyPostsContainer/>
  </div>
 ) 


}
export default Profile;