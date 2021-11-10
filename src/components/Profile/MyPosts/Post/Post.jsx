import s from './Post.module.css'
const Post = (props)=>{
    return (
  <div className={s.item}> 
   <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_eYJvaANaekTWeJ3D-sJD6i8rH2qiKXk8Cg&usqp=CAU'/>
   {props.message} 
    <div> <span> likes </span> { props.likeCounter} </div>
  </div>
   )
}
export default Post;