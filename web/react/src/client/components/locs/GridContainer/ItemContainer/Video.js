/*eslint-env browser*/
import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';
import { connect } from 'react-redux';
import { fetchActiveItem } from './../../../../../actions';
import './assets/scss';
import './assets/images';

class Video extends Component {
	constructor(props) {
		super(props);
		this.escFunction = this.escFunction.bind(this);
		this.stateChecker = null;
	}
	componentDidMount() {
		document.addEventListener('keydown', this.escFunction, false);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.escFunction, false);
		clearInterval(this.stateChecker);
	}

	getDeviceType() {
		if (this.props.deviceType === 'laptop') return 'playing';
		return 'paused';
	}

	escFunction(event) {
		// if (event.key === 'f') {
		// 	if (this.playerState === 'paused') this.playerState = 'playing';
		// 	else this.playerState = 'paused';
		// }
		if (event.key && this.props.activeItem !== 'hidden') this.exitVideo();
	}

	playing() {
		// test
	}

	videoContent(selectedVideo) {
		const videoContent = this.props.content.itemVideo;
		if (selectedVideo === 'hidden') return null;
		return (
			<div className={`videoPlayer video${selectedVideo}`}>
				<div className="exitBtn" onClick={this.exitVideo} />
				<YoutubePlayer
					videoId={videoContent[selectedVideo].videoID}
					// MAKE THIS DEPENDENT ON DEVICE TYPE
					// IF LAPTOP START PLAYING ELSE PAUSED
					playbackState={this.getDeviceType()}
					onPlay={this.playing}
					onEnd={this.exitVideo}
					configuration={{
						showinfo: 0,
						controls: 1,
						frameborder: 0,
						rel: 0,
						fs: 0,
						origin: 'https://www.youtube.com'
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
		activeItem: state.activeItem,
		deviceType: state.deviceType,
		content: state.content
	});

export default connect(mapStateToProps, { fetchActiveItem })(Video);
