import './App.css';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News';
import Login from './components/Login/Login';
import {  Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/app-reducer.ts';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {withSuspense} from './components/hoc/withSuspense';

const DialogsContainer = React.lazy(()=>import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(()=>import('./components/Users/UsersContainer'));

class  App extends React.Component {

  catchAllUnhandleRejection(){
    alert('some error occured');
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleRejection)
}

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandleRejection)
  }
  render () {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
      <HeaderContainer/>
      <Navbar />
   <div className = 'app-wrapper-content'> 
   <Switch>
      <Route exact path='/' render={()=><Redirect to={'/profile'}/>}/>
      <Route path='/profile/:userID?' render = { ()=>  <ProfileContainer />} />
      <Route  path='/dialogs' render = {withSuspense(DialogsContainer) } /> 
      <Route  path='/users' render = { withSuspense(UsersContainer)}/> 
      <Route path = '/news' component = {News} />
      <Route path='/login' render = { ()=> <Login/>} />
      <Route path='*' render = { ()=> <div>NOT FOUND 404</div>} />
    </Switch>
   </div>
    </div>
  );}
}

const mapStateToProps = (state)=>({
  initialized: state.app.initialized
})

let AppContainer = compose (
  withRouter,
  connect(mapStateToProps, {initializeApp})
)
(App);


const AppSamurai = (props)=>{
  return (
  <BrowserRouter>
  <Provider store = {store}>
    <AppContainer/>
  </Provider>
  </BrowserRouter>
  )
}

export default AppSamurai;

