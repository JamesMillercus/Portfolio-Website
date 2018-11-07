import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './assets/scss';
import './assets/images';

class HeroHeader extends Component {
  setClass() {
    const { deviceType, content } = this.props;
    const gridContainerClasses = [];
    if (content.page === 'home') gridContainerClasses.push(`hero-header-${deviceType}`);
    else gridContainerClasses.push('hero-header-laptop');
    return gridContainerClasses;
  }

  // h1 with css style based on the selected item and icon
  render() {
    const { content } = this.props;

    return (
      <Link to={content.heroText.centerIcon.href} className={this.setClass().join(' ')}>
        <span className={'webvrText'}>View this website in Web VR </span>
        <span className={'webvrImg'} />
      </Link>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	deviceType: state.deviceType,
  content: state.content
});

export default connect(mapStateToProps, null)(HeroHeader);
