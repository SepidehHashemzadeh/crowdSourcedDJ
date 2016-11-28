import { expect, assert } from 'chai';
import { shallow, mount} from 'enzyme';  
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
describe('EventPageLeader inegration test', () => {
  it('test EventPageLeader integrates correctly with its child components', () => {
     const Mwrapper = mount(<EventPageLeader/>);
     const SearchSong=Mwrapper.find('SearchSong');
     expect(SearchSong.find("input")).to.have.length(1);
     const EditForm'=Mwrapper.find('EditForm');
     expect(EditForm'.find("Form")).to.have.length(1);
     const EventAttendeeQueue=Mwrapper.find('EventAttendeeQueue');
     expect(EventAttendeeQueue.find("ul")).to.have.length(1);
     const EventPageLeaderInviteNotificationStack=Mwrapper.find('EventPageLeaderInviteNotificationStack');
     expect(EventPageLeaderInviteNotificationStack.find("ul")).to.have.length(1);
  });
});

