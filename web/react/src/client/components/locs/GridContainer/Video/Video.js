/*eslint-env browser*/
import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';
import { connect } from 'react-redux';
import { fetchActiveItem } from './../../../../actions';
import videoConfig from './assets/config/videoConfig';
import './assets/scss/Video.scss';

class Video extends Component {
	constructor(props) {
		super(props);
		this.escFunction = this.escFunction.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown', this.escFunction, false);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.escFunction, false);
	}
	escFunction(event) {
		if (event.keyCode === 27 && this.props.activeItem !== 'hidden') this.exitVideo();
	}

	playing() {
		// test
	}

	videoContent(selectedVideo) {
		if (selectedVideo === 'hidden') return null;

		return (
			<div className={`videoPlayer video${selectedVideo}`}>
			<div className="exitBtn" onClick={this.exitVideo} />
			<YoutubePlayer
			videoId={videoConfig[selectedVideo].videoID}
			playbackState='playing'
			onPlay={this.playing}
			onEnd={this.exitVideo}
			configuration={{
				showinfo: 0,
				controls: 1,
				frameborder: 0,
				rel: 0,
				fs: 0
			}}
			/>
			</div>
		);
	}
	render() {
		const item = this.props.activeItem;

		this.exitVideo = () => {
			this.props.fetchActiveItem('hidden');
		};

		return (
			this.videoContent(item)
		);
	}

}

// player.getPlayerState():Number

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		activeItem: state.activeItem
	});

export default connect(mapStateToProps, { fetchActiveItem })(Video);
