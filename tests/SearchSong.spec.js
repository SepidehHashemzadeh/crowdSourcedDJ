import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import SearchSong from '../components/SearchSong';
import sinon from 'sinon';
describe('<SearchSong rendering/>', () => {
  it('it should render 1 input component', () => {
    const wrapper = shallow(<SearchSong/>);
    expect(wrapper.find("input")).to.have.length(1);
  });
});
describe('SearchSong Behavior', () => {
  it('test SearchSongbehavior', () => {

       const onChange = sinon.spy();

    const wrapper = shallow( <SearchSong  onChange={onChange}/> );
   
    wrapper.find('span').at(0).simulate('change');
    expect(onChange.calledOnce).to.equal(true);
  
     });
});