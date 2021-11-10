import React, {useState} from 'react';
import s from'./ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/img/defoultAva.jpg';
import ProfileDataFormReduxForm from './ProfileDataForm';


const ProfileInfo = (props) => {

  const [editeMode, setEditeMode]=useState(false);

  const onSubmit = (formData)=>{
    props.saveProfile(formData).then(
      ()=>{
        setEditeMode(false);
      }
    )
  }

  const loadPhoto = (e)=>{
    if (e.target.files.length) {
    props.savePhoto(e.target.files[0])
    }
  }

  if (!props.profile){
    return <Preloader/>
  }
 return    ( <div>
 {/* <div> 
   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEyPe9NJRLuPAIl172xp2oon4YdWkVmrev_A&usqp=CAU'/> 
 </div> */}
 <div className = {s.description}> 
  <img src={props.profile.photos.small||userPhoto} className = {s.mainPhoto}alt='there must be ava'/>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
      {props.isOwner&&<input type='file' onChange={loadPhoto}></input>}
      {editeMode?<ProfileDataFormReduxForm initialValues={props.profile} onSubmit={onSubmit}  {...props}/>:<ProfileData {...props} goToEditeMode = {()=>{setEditeMode(true)}}/>}
      
 </div>
 </div> )

}


const ProfileData = (props)=>{
  return (
  <div>
    {props.isOwner&& 
    <div> 
      <button onClick = {props.goToEditeMode}> edite </button>
    </div>}
    <div> 
        <b> name: </b> {props.profile.fullName}
      </div>
      <div>
      <b> looking for a job: </b>{props.profile.lookingForAJob?'yes':'no'}
      </div>
      {props.profile.lookingForAJob &&
      <div> 
        <b> my skills </b> {props.profile.lookingForAJobDescription}
      </div>}
      <div>
        <b> about me: </b>{props.profile.aboutMe}
      </div>
      <div> 
        <b> Contacts: </b> {Object.keys(props.profile.contacts).map (key=>{
          return <Contact  key={key} meanOfCommunication={key} meanOfCommunicationValue = {props.profile.contacts[key]} />
        })}  
      </div>
  </div>
  )
}
const Contact = ({meanOfCommunication, meanOfCommunicationValue})=>{
  return (
    <div className = {s.contact}> {meanOfCommunication}: {meanOfCommunicationValue} </div>
    )
  
}
export default ProfileInfo;