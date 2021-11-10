import React, {ChangeEvent} from 'react';


type propsType = {
    status:string
    updateStatus:(newStatus:string)=>void
}

type stateType = {
    editMode:boolean
    status:string
}

export default class ProfileStatus extends React.Component<propsType, stateType> {
    state = {
        editMode:false,
        status: this.props.status
    }

    activateEditMode = ()=> {
        this.setState({
            editMode:true
        })
    }

    deactivateEditMode () {
        this.setState({
            editMode:false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate (prevProps:propsType, prevState:stateType) {
        if (this.props.status!==prevProps.status){
            this.setState({
                status:this.props.status
            })
        }
    }
    render() {
        return (
            <div>
               { !this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '---'}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus = {true} onBlur={ this.deactivateEditMode.bind(this)} 
                    value = {this.state.status}></input>
                </div>}
            </div>
        )
    }
}

//     return (
//         <div>
//            { this.state.editMode ? 
//            <div>
//                 <input value = {this.props.status}></input>
//             </div>
//             :
//             <div>
//                  <span>{this.props.status}</span>
//             </div>}
//         </div>
//     )



