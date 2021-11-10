import {profileReducer,addPostActionCreator, ADD_POST, deletePost} from './profile-reducer';
import React from 'react';




// let action2 = {type:ADD_POST,newPostText:'my first test'};
let state = {
    posts: [ 
        {id: 1, message: 'Hello everythink. It is my first post', likeCounter: 15},
        {id: 2, message: 'It is time go to bed',  likeCounter: 27},  
         {id: 3, message: 'It is time go to bed',  likeCounter: 27},  
         {id: 4, message: 'It is time go to bed',  likeCounter: 27}, 
       ],
}

// it('new post must be added',()=>{
    
//     let action = addPostActionCreator('my first test');
//     let updateState = profileReducer(state, action);
//     expect(updateState.posts.length).toBe(5);
// })

// it ('next post should be expected', ()=>{
//     let action = addPostActionCreator('my second test');
//     let newState=profileReducer(state, action);
//     expect(newState.posts[4].message).toBe('my second test');
// })

it ('check delete post or not', ()=>{
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
})






