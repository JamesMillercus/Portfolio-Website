import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubePlayer from 'react-youtube-player';
import { fetchScrolledItem } from './../../../actions';
import { fetchActiveItem } from './../../../actions';
import { connect } from 'react-redux';
import { videoConfig } from './config/videoConfig';
import './scss/Video.scss';

class Video extends Component {


	render(){

		const item = this.props.activeItem;

		this.exitVideo = () => {
			this.props.fetchActiveItem("hidden");
		}

		return (
			<div className ="videoContainer">{this.videoContent(item)}</div>
		)
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
					    configuration={
					        {
					            showinfo: 0,
					            controls: 0,
					            frameborder: 0,
					            rel: 0
					        }
					    }
					/>
				</div>
			)
		}
	}

}


// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { 
		activeItem: state.activeItem
	};
}

export default connect(mapStateToProps, { fetchActiveItem })(Video);