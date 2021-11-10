import s from './MyPosts.module.css'
import Post from './Post/Post'
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';



const MyPosts = React.memo((props)=>{
  let postsElements = 
  props.posts.map (p => <Post  message = {p.message} likeCounter={p.likeCounter} key={p.id}/>);

  

let onAddPost= (values) => {
   props.addPost(values.newPostText);
}


    return (
     <div className = {s.postsBlock}> 
       <h3> My posts  </h3> 
       <MyPostReduxForm onSubmit={onAddPost}/>
            <div className = {s.posts}>
              {postsElements}
            </div>
     </div>
      )
})

const maxLength50 = maxLengthCreator(50);

const MyPostForm=(props)=>{
  return( 
  <form onSubmit={props.handleSubmit}>
       <div>
           <Field component={Textarea} placeholder = {'write your post'} name='newPostText' validate={[required, maxLength50 ]}/>
       </div>
        <div>
            <button> Add post </button>
       </div>
  </form>)
}

const MyPostReduxForm=reduxForm({
  form: 'ProfileAddТewPostForm'
}
) (MyPostForm)
export default MyPosts;