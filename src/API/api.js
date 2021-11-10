import * as axios from 'axios';

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers: {
        "API-KEY": '56d8bd3f-59d9-4120-941c-d410b7646811'
    },
}) 


export const userAPI = {
    getUser(currentPage=10, pageSize=10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
          .then(response=>{
              return response.data;
          });
        },

        followOnUser(userID) {
            return instance.post(`follow/`+userID)
            .then(response=>{
                return response.data;
            })
        },

        unfollowOnUser(userID) {
            return instance.delete(`follow/`+userID)
            .then(response=>{
                return response.data;
            })
        },

        getProfile(userID) {
            console.warn('old method')
            return profileAPI.getProfile(userID)
        }   
}

export const profileAPI = {

    updateChangesProfile(profile) {
        return instance.put(`profile/`, profile)
    },

    getProfile(userID) {
        return instance.get(`profile/`+userID)
    },
    
    getStatus(userID) {
        return instance.get(`profile/status/${userID}`)
    },

    updateStatus(status){
        return instance.put(`profile/status`, {status:status})
    },

    loadPhoto(filePhoto) {
        const formData = new FormData();
        formData.append('image', filePhoto)
        return instance.put(`profile/photo`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        } )
    }
}

export const authAPI = {

 me() {
    return instance.get(`auth/me`)
 },
 
 login (email, password, rememberMe = false, captcha=null) {
     return instance.post(`auth/login`, {email, password, rememberMe, captcha} )
 },

 logout () {
     return instance.delete (`auth/login`) 
 }
}

export const securituAPI={
    getCaptcha() {
        return instance.get('/security/get-captcha-url')
    }
}

        //   axios.post(`https://social-network.samuraijs.com/api/1.0/follow/`+u.id, {}, {
        //     withCredentials:true,
        //     headers: {
        //         "API-KEY": '56d8bd3f-59d9-4120-941c-d410b7646811'
        //     }
        // })




