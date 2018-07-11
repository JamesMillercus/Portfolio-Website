import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubePlayer from 'react-youtube-player';
import { connect } from 'react-redux';
import { fetchScrolledItem, fetchActiveItem } from './../../../actions';
import videoConfig from './assets/config/videoConfig';
import './assets/scss/Video.scss';

class Video extends Component {
	constructor(props){
		super(props);
		this.escFunction = this.escFunction.bind(this);
	}
	escFunction(event){
		if(event.keyCode === 27 && this.props.activeItem != "hidden") this.exitVideo();
	}
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}

	render(){
		const item = this.props.activeItem;

		this.exitVideo = () => {
			this.props.fetchActiveItem("hidden");
		}

		return (
			<div className ="videoContainer">{this.videoContent(item)}</div>
		)
	}

	playing(){
		// test
	}

	videoContent(selectedVideo) {
		if(selectedVideo == "hidden") return null;
		else { 
			return(
				<div className={`videoPlayer video${selectedVideo}`}>
					<div className = "exitBtn" onClick={this.exitVideo} />
					<YoutubePlayer             
					    videoId= {videoConfig[selectedVideo].videoID}
					    playbackState='playing'
					    onPlay= {this.playing}
					    onEnd = {this.exitVideo}
					    configuration={
					        {
					            showinfo: 0,
					            controls: 1,
					            frameborder: 0,
					            rel: 0,
					            fs: 0
					        }
					    }
					/>
				</div>
			)
		}
	}
}

// player.getPlayerState():Number

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { 
		activeItem: state.activeItem
	};
}

export default connect(mapStateToProps, { fetchActiveItem })(Video);