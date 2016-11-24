import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import EventPageLeader  from '../components/EventPageLeader';
import sinon from 'sinon';
describe('<EventPageLeader rendering />', () => {
  it('it should render 4 Button  components', () => {
    const wrapper = shallow(<EventPageLeader />);
   
    expect(wrapper.find("button")).to.have.length(4);
  });
  

});
describe('components', () => {
  it('test EventPageLeader behavior', () => {

       const onClick = sinon.spy();

    const wrapper = shallow( <EventPageLeader onClick={onClick}/> );
   
    wrapper.find('button').at(1).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  
     });
});