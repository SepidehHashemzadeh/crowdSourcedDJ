//
import { expect, assert, should } from 'chai';
import { shallow, mount} from 'enzyme';  

import React from 'react';  
import CreateEventForm from '../components/CreateEventForm';
import sinon from 'sinon';
describe('<CreateEventForm rendering/>', () => {
  it('it should render 1 Form component', () => {
    const wrapper = shallow(<CreateEventForm/>);
 
    expect(wrapper.find("Form")).to.have.length(1);
  });
  

});
 
              
describe('CreateEventForm Behavoir', () => {
  it('test CreateEventForm Behavoir', () => {

       const onClick = sinon.spy();

    const wrapper = shallow( <CreateEventForm onClick={onClick}/> );
   
   wrapper.find('Button').at(3).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  
     });
});

