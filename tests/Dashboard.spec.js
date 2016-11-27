import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';  
import React from 'react';  
import Dashboard from '../components/Dashboard';
var sinon      = require('sinon');

describe('<Dashboard rendering/>', () => {
  it('it should render 1 image component', () => {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper.find("img")).to.have.length(1);
  });
});
describe('<Dashboard rendering/>', () => {
  it('it should render 6 eventsDivs component', () => {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper.find(className="eventsDivs")).to.have.length(6);
  });
});
describe('Dashboard Behavior', () => {
  it('test Dashboard behavior', () => {

    const handleSelect = sinon.spy();

    const wrapper = shallow( <Dashboard  handleSelect={handleSelect}/> );
   
    wrapper.find('ControlledTabs').at(0).simulate('select');
    expect(handleSelect.calledOnce).to.equal(true);
  
     });
});
describe('Dashboard inegration test', () => {
  it('test Dashboard integrates correctly with its child components', () => {
     const Mwrapper = mount(<Dashboard/>);
     const searchEven=Mwrapper.find('SearchEvent');
     expect(searchItem.find("span")).to.have.length(1);
     const searchItemList=Mwrapper.find('SearchEventList');
     expect(searchItemList.find("ul")).to.have.length(1);
     const ControlledTabs=Mwrapper.find('ControlledTabs');
     expect(ControlledTabs.find("label")).to.have.length(2);
     const CreateEventForm=Mwrapper.find('CreateEventForm');
     expect(CreateEventForm.find("Form")).to.have.length(1);
     const EventPageLeader=Mwrapper.find('EventPageLeader');
     expect(EventPageLeader.find("button")).to.have.length(4);
     });
});
