import React, { Component } from 'react';
import Item from './../../../components/locs/Item/desktop/Item';
import Hero from './../../../components/locs/Item/desktop/Hero';
import './Desktop.scss';
// import './../assets/react.png';

class Desktop extends Component {
  
	renderItems() {		
		const items = [];
		// push all content into the items array
		for(let x = 0; x<9; x++) {
			if (x == 4) items.push(<Hero key={x} />);
			else items.push(<Item number={x} key={x} />);
		}
  		
  		return items;
	}

	render() {
		/** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
		return (
			<div className = "grid-container"> 
				{this.renderItems()}
			</div>
		)
	}
};

// take props from admins and pass them into require Auth
export default Desktop;

