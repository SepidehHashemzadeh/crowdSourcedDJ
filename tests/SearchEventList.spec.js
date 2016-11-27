import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';  
import React from 'react';  
import SearchEventList from '../components/SearchEventList';
import sinon from 'sinon';
describe('<SearchEventLis rendering />', () => {
  it('it should render 1 div component', () => {
    const wrapper = shallow(<SearchEventLis/>);
    expect(wrapper.find("div")).to.have.length(1);
  });
  

});
describe('<SearchEventList rendering/>', () => {
  it('it should render 1 ul component', () => {
    const wrapper = shallow(<SearchEventList/>);
    expect(wrapper.find("ul")).to.have.length(1);
  });
  

});
describe('SearchEventList inegration test', () => {
  it('test SearchEventList integrates correctly with its child components', () => {
     const Mwrapper = mount(<SearchEventList/>);
     const SearchEventListItem=Mwrapper.find('SearchEventListItem');
     expect(SearchEventListItem.find("div")).to.have.length(3);
     });
});
