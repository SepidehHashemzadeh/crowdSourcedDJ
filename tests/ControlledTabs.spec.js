//
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';  
import React from 'react';  
import sinon from 'sinon';
import ControlledTabs from '../components/ControlledTabs';

describe('<ControlledTabs rendering />', () => {
   beforeEach(() => {
    const wrapper = shallow(<ControlledTabs/>);
     });
it('it should render 2 label component', () => {
    const wrapper = shallow(<ControlledTabs/>);
    expect(wrapper.find("label")).to.have.length(2);
  });
  

});
    
    
 describe('ControlledTabs behavior ', () => {
  let select1;
  let handleSelect;
 
   const spy = sinon.spy()
    const html= shallow(<ControlledTabs handleSelect={spy} />);
                        
    it('test ControlledTabs behavior', () => {
    html.setState({ key: 1});
    const modal = html.find('.c-tabs').first()
    modal.simulate('Change')
    expect(spy.notCalled).to.be.true

  });
});
