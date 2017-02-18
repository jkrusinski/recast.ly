class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videoList: props.videos,
      currentVid: props.videos[0],
      searchQuery: '',
      videoHashTable: this.populateVideoHashTable(props.videos)
    };
  }

  handleClick(vid, event) {
    this.setState({
      currentVid: this.state.videoHashTable[vid]
    });
  }

  handleSearchInput(event) {
    var context = this;
    searchYouTube({query: event.target.value, max: 5, key: YOUTUBE_API_KEY}, (data) => {
      context.setState({
        videoList: data.items,
        videoHashTable: context.populateVideoHashTable(data.items)
      });
    });
  }

  populateVideoHashTable(videoList) {
    return videoList.reduce((videos, video) => {
      videos[video.id.videoId] = video;
      return videos;
    }, {});
  }  

  render() {
    return (
      <div>
        <Nav handleSearchInput={this.handleSearchInput.bind(this)} />
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVid} />
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videoList} handleClick={this.handleClick.bind(this)} />
        </div>
      </div>
    );
  }  
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
