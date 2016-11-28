import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import EventListItem  from '../components/EventListItem';
import sinon from 'sinon';
describe('<EventListItem rendering />', () => {
  it('it should render 3 paragraph  component', () => {
    const wrapper = shallow(<EventListItem />);
   
    expect(wrapper.find('p')).to.have.length(3);
  });
  

});
describe('EventListItem', () => {
  it('test onMouseEnter behavior', () => {

       const onMouseEnter = sinon.spy();

    const wrapper = shallow( <EventListItem onMouseEnter={onMouseEnter}/> );
   
    wrapper.find('div').at(1).simulate('mouseEnter');
    expect(onMouseEnter.calledOnce).to.equal(true);
  
     });
});