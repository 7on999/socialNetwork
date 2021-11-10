export const required = (value)=>{
    if (value) return undefined;

    return 'field is not required'
}

export const maxLengthCreator = (maxLength)=> (value)=> {
 if (value.length>maxLength) {
     return `max length is ${maxLength} simbols`
 }
 return undefined;
}

