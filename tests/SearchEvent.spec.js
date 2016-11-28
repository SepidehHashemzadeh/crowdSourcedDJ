import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import SearchEvent from '../components/SearchEvent';
import sinon from 'sinon';
describe('<SearchEvent rendering/>', () => {
  it('it should render 1 span component', () => {
    const wrapper = shallow(<SearchEvent/>);
    expect(wrapper.find("span")).to.have.length(1);
  });
  

});
describe('SearchEvent Behavior', () => {
  it('test Search behavior', () => {

       const onChange = sinon.spy();

    const wrapper = shallow( <SearchEvent onChange={onChange}/> );
   
    wrapper.find('input').at(0).simulate('change');
    expect(onChange.calledOnce).to.equal(true);
  
     });
});