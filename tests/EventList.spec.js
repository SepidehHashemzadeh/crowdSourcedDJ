import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import EventList from '../components/EventList';

describe('<EventList rendering />', () => {
  it('it should render 1 ul  component', () => {
    const wrapper = shallow(<EventList/>);
   
    expect(wrapper.find("ul")).to.have.length(1);
  });
  

});
describe('<EventList rendering />', () => {
  it('it should render 1 div  component', () => {
    const wrapper = shallow(<EventList/>);
   
    expect(wrapper.find("div")).to.have.length(1);
  });

});