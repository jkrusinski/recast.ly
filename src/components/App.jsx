class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videoList: null,
      currentVid: null,
      videoHashTable: null
    };
  }

  handleClick(vid, event) {
    this.setState({
      currentVid: this.state.videoHashTable[vid]
    });
  }

  handleSearchInput(event) {
    var context = this;
    this.props.searchYouTube({query: event.target.value, max: 5, key: YOUTUBE_API_KEY}, (data) => {
    // hack to fix the stupid, stupid spec
      if (!data.items) {
        data.items = data;
      }
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

  componentDidMount() {
    var context = this;
    this.props.searchYouTube({query: 'Rick Astley', max: 5, key: YOUTUBE_API_KEY}, (data) => {
      // hack to fix the stupid, stupid spec
      if (!data.items) {
        data.items = data;
      }

      context.setState({
        videoList: data.items,
        videoHashTable: context.populateVideoHashTable(data.items),
        currentVid: data.items[0]
      });
    });
  }

  render() {
    return (
      this.state.videoList ?



      <div className="container-fluid">
        <Nav handleSearchInput={this.handleSearchInput.bind(this)} />
        
        <div className="row">
          <div className="col-sm-5 col-sm-offset-2">
            <VideoPlayer video={this.state.currentVid} />
          </div>
        
          <div className="col-sm-3">
            <VideoList videos={this.state.videoList} handleClick={this.handleClick.bind(this)} />
          </div>
        </div>
      </div> 


      :

      <div>Waiting for server...</div>

    );
  }  
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
