import React from 'react';
import ReactDOM from 'react-dom';

class SearchEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        searchStr: ""
    };
    this.handleSearchStr = this.handleSearchStr.bind(this);
  }

  render() {
    return (
      <div className="box">
       <div className="container-1">
          <span className="icon"><i className="fa fa-search"></i></span>
          <input type="search" id="search" placeholder="Search existing events" value={this.state.searchStr} onChange={this.handleSearchStr}/>
      </div>
    </div>
    );
  }

  handleSearchStr(e){
    this.setState({ searchStr: e.target.value });
    this.props.onSearchTermChange(e.target.value);
  }

}

export default SearchEvent;