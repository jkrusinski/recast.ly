var Nav = (props) => (
  <nav className="navbar col-sm-8 col-sm-offset-2">
    <div className="">
      <Search handleSearchInput={props.handleSearchInput} />
    </div>
  </nav>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Nav = Nav;
