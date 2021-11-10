import { render, screen } from '@testing-library/react';
import AppSamurai from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './components/Profile/ProfileInfo/ProfileStatus';

// test('renders learn react link', () => {
//   render(<AppSamurai />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders without crushing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppSamurai />, div);
  ReactDOM.unmountComponentAtNode(div);
});



  // test('fake2', () => {
  //   const component = create(<ProfileStatus status ='go go go'/>);
  //   const root = component.root;
   
  //   expect(()=>{
  //     let input = root.findByType('input');
  //   }).toThrow();
  // });

  test('fake3', () => {
    const component = create(<ProfileStatus status ='go go go'/>);
    const root = component.root;
  let span = root.findByType('span');
  span.props.onDoubleClick();
  let input = root.findByType('input');
  expect(input.props.value).toBe('go go go');
    
  });



  // test('fake3', () => {
  //   const component = create(<ProfileStatus status ='go go go'/>);
  //   const root = component.root();
  //   let root = root.findByType('span');
  //   expect(span.innerText).toBe('go go go');
  // });




