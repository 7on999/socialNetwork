import React, {useState, useEffect} from 'react';

 const  ProfileStatusWithHooks = (props)=> {

    const [editMode, stateEditeMode ]= useState(false);
    const [status, setStatus] = useState(props.status)

  useEffect(()=>{
    setStatus(props.status)
  }, [props.status])

    const activateEditMode = ()=> {
        stateEditeMode (true)
    }

    const deactivateEditMode=() => {
        stateEditeMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e)=>{
        setStatus(e.currentTarget.value)

    }

  
        return (
            <div>
               { !editMode &&
                <div>
                    <b>Status:</b><span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
                </div>}
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus = {true} onBlur={deactivateEditMode} 
                    value = {status}></input>
                </div>}
            </div>
        )
    }

    export default ProfileStatusWithHooks;