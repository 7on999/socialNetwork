import React from 'react';
import s from './FormsControls.module.css';

const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className = {s.formControl + ' ' + (hasError?s.error:'')}>
            <div>
                {props.children}
            </div>
            <div>
               {(hasError) ? <span>{meta.error}</span>:''} 
               {/* {hasError&&<span>'some error'</span>} */}
            </div>

        </div>
    )
}


export const Textarea =(props)=>{
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...restProps} {...input}/> </FormControl>
}



export const Input =(props)=>{
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <input {...restProps} {...input}/> </FormControl>
}

