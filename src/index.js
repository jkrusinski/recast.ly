// TODO: Render the `App` component to the DOM
searchYouTube({query: 'React JS', max: 5, key: YOUTUBE_API_KEY}, (data) => {
  ReactDOM.render(<App videos={data.items}/>, document.getElementById('app'));
});

