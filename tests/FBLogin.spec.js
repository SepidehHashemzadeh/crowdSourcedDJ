import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import FBLogin from '../components/FBLogin';
import sinon from 'sinon';
describe('<FBLogin rendering />', () => {
  it('it should render signInFormDiv component', () => {
    const wrapper = shallow(<FBLogin/>);
    expect(wrapper.find(className="signInFormDiv")).to.have.length(1);
  });
  

});
describe('FBLogin Behavior', () => {
  it('test FBLogin behavior', () => {

       const onClick = sinon.spy();

    const wrapper = shallow( <FBLogin onClick={onClick}/> );
   
    wrapper.find('FacebookLogin').at(0).simulate('click');
    expect(onClick.calledOnce).to.equal(false);
  
     });
});