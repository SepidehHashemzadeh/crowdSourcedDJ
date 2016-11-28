import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import SearchEventListItem  from '../components/SearchEventListItem';
import sinon from 'sinon';
describe('<SearchEventListItem rendering  />', () => {
  it('it should render 3 div component', () => {
    const wrapper = shallow(<SearchEventListItem />);
    expect(wrapper.find("div")).to.have.length(3);
  }); 

});
describe('<SearchEventListItem rendering  />', () => {
  it('it should render 3 li component', () => {
    const wrapper = shallow(<SearchEventListItem />);
    expect(wrapper.find("li")).to.have.length(3);
  }); 

});
});
describe('SearchEventListItem', () => {
  it('test SearchEventListItem behavior', () => {

       const onClick = sinon.spy();

    const wrapper = shallow( <SearchEventListItem onClick={onClick}/> );
   
    wrapper.find('button').at(1).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  
     });
});