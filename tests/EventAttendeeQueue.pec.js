import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import EventAttendeeQueue from '../components/EventAttendeeQueue';

describe('<EventAttendeeQueue/>', () => {
  it('it should render 1 ul  component', () => {
    const wrapper = shallow(<EventAttendeeQueue/>);
   
    expect(wrapper.find("ul")).to.have.length(1);
  });
  

});
describe('EventAttendeeQueue', () => {
  it('test EventAttendeeQueue behavior', () => {

       const onMouseEnter = sinon.spy();

    const wrapper = shallow( <EventAttendeeQueue onMouseEnter={onMouseEnter}/> );
   
    wrapper.find('div').at(1).simulate('mouseEnter');
    expect(onMouseEnter.calledOnce).to.equal(true);
  
     });
});