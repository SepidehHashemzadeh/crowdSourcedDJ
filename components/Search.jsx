import React from 'react';
import ReactList from 'react-list';

import DatabaseHelper from '../databaseShortcuts.js';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      searchStr: "",
      events: []
    };
    this.searchEvents = this.searchEvents.bind(this);
    this.render = this.render.bind(this);
    this.handleSearchStr = this.handleSearchStr.bind(this);

  }

  render() {
    return (
      <div className="box">
       <div className="container-1">
          <span className="icon"><i className="fa fa-search"></i></span>
          <input type="search" id="search" placeholder="Search existing events" value={this.state.searchStr} onChange={this.handleSearchStr}/>
          <div id="listDiv"></div>
      </div>
    </div>
    );
  }

  searchEvents() {
    var searchStr = this.state.searchStr;
    var listDiv = document.getElementById('listDiv');
    console.log(searchStr);
    var query = "SELECT * FROM Events WHERE name='" + searchStr + "';";
    DatabaseHelper(query).then((res) => {
      console.log(res);
      console.log(res.length);
      //var ids = [];
      //for(var k = 0; k < res.length; k++) { ids.push(k)}
      //var mappedResult = SOMETHING.map(function() {
      //  return [res[i].id,res[i].name];
      //});

      //console.log(mappedResult);

      //this.setState({events: mappedResult});

      //var list = <ReactList
                               // itemRenderer={this.renderItem}
                               // length={this.state.mappedResult.length}
                              //  type='uniform'
                              //  />;

               // ReactDOM.render(list, listDiv);
    });

  }

  handleSearchStr(e){
    this.setState({ searchStr: e.target.value });
    this.searchEvents();
  }

  renderItem(index, key) {
    return (<div key={key}>{this.state.events[index].name}</div>);
  }

}

export default Search;