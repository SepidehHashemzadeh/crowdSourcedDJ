import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import EventPageLeaderInviteNotificationStack from '../components/EventPageLeaderInviteNotificationStack';
import sinon from 'sinon';
describe('<EventPageLeaderInviteNotificationStack />', () => {
  it('it should render 1 ul component', () => {
    const wrapper = shallow(<EventPageLeaderInviteNotificationStack/>);
   
    expect(wrapper.find("ul")).to.have.length(1);
  });
  

});
describe('EventPageLeaderInviteNotificationStack ', () => {
  it('test onMouseEnter behavior', () => {

       const onClick = sinon.spy();

    const wrapper = shallow( <EventPageLeaderInviteNotificationStack  onClick={onClick}/> );
   
    wrapper.find('span').at(1).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  
     });
});