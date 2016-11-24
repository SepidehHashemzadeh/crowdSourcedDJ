import { expect, assert } from 'chai';
import { shallow } from 'enzyme';  
import React from 'react';  
import EditForm from '../components/EditForm';
import sinon from 'sinon';
describe('<EditForm  rendering/>', () => {
  it('it should render 1 Form  component', () => {
    const wrapper = shallow(<EditForm/>);
   
    expect(wrapper.find("Form")).to.have.length(1);
  });
  

});
describe('EditForm Behavior', () => {
  it('test editForm behavior', () => {

       const onClick = sinon.spy();

    const wrapper = shallow( <EditForm onClick={onClick}/> );
   
    wrapper.find('Button').at(3).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  
     });
});