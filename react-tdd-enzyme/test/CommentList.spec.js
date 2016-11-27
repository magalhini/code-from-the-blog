import React from 'react';
import CommentList from '../src/components/CommentList';

describe('<CommentList />', () => {

  const cb = (args) => 23;

  // Shallow

  it('should render the component', () => {
    const wrapper = shallow(<CommentList/>);
    expect(wrapper.find('.comments-list')).to.have.length(1);
  });

  // Mount

  it('calls componentDidMount', () => {
    spy(CommentList.prototype, 'componentDidMount');

    const wrapper = mount(<CommentList />);
    expect(CommentList.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<CommentList onMount={ cb } />);
    expect(wrapper.props().onMount()).to.equal(23);
    wrapper.setProps({ bar: "foo" });
    expect(wrapper.props().bar).to.equal("foo");
  });

  // Render

  it('renders a button name', () => {
    const wrapper = render(<CommentList buttonValue="myButton"/>);
    expect(wrapper.find('button').text()).to.contain('myButton');
  });

  it('reverses the comments on the button click', () => {
    const wrapper = mount(<CommentList />);

    wrapper.setState({ comments: ['hello'] });
    wrapper.find('button').simulate('click');
    expect(wrapper.state().comments[0]).to.equal('olleh');
  });

});
