import React from 'react';
import Comment from '../src/components/Comment';

describe('Comment item', () => {
  const wrapper = shallow(<Comment />);

  it('is of type <li>', () => {
    expect(wrapper.type()).to.eql('li');
  });

  it('renders the custom comment text', () => {
    wrapper.setProps({
      comment: 'sympathetic ink'
    });
    
    expect(wrapper.contains('sympathetic ink')).to.equal(true);
  });

  it('has a class name of "comment-item"', () => {
    expect(wrapper.find('.comment-item')).to.have.length(1);
  });
});
