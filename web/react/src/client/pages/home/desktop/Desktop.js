import React, { Component } from 'react';
import { fetchScrolledItem } from './../../../actions';
import { connect } from 'react-redux';
import Item from './../../../components/locs/Item/Item';
import Hero from './../../../components/locs/Hero/Hero';
import Video from './../../../components/locs/Video/Video';
import './assets/scss/gridContainer.scss';
import './assets/scss/gridContainerAnimation.scss';

class Desktop extends Component {
  
	renderItems() {		
		const items = [];
		// push all content into the items array
		for(let x = 0; x<9; x++) {
			if (x == 4) items.push(<Hero number={x} key={x} />);
			else items.push(<Item number={x} key={x} />);
		}
  		items.push(<Video key={9} />);
  		return items;
	}

	setClass() {
		let gridContainerClasses = ["grid-container"];
		gridContainerClasses.push('item' + this.props.scrolledItem + 'scroll');
		return gridContainerClasses;
	}

	render() {
		/** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
		return (
			<div className = {this.setClass().join(' ')}> 
				{this.renderItems()}
			</div>
		)
	}
};

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
	return { scrolledItem: state.scrolledItem };
}

export default connect(mapStateToProps, { fetchScrolledItem })(Desktop);