import React from 'react';
import ReactList from 'react-list';
import ReactDOM from 'react-dom';

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
      </div>
    </div>
    );
  }

  searchEvents() {
    var searchStr = this.state.searchStr;
    var listDiv = document.getElementById('search');
    console.log(searchStr);
    var query = "SELECT * FROM Events WHERE name='" + searchStr + "';";

    listDiv = document.createElement('div');
    listDiv.id = 'listDiv';
    listDiv.style.overflow = 'auto';
    listDiv.style.maxHeight = 400;
    var app = document.getElementById('app');
    app.parentNode.insertBefore(listDiv, app.nextSibling);


    DatabaseHelper(query).then((res) => {
      console.log(res);
      var ids = [];
      var names = [];
      for(var k = 0; k < res.length; k++) { ids.push(res[k].id) }
      for(var j = 0; j < res.length; j++) { names.push(res[j].name) }



      var mappedResult = ids.map(function(e, i) {
        return [e, names[i]];
      });

      console.log(mappedResult);

      this.setState({events: mappedResult});

      var list = <ReactList
                               itemRenderer={this.renderItem}
                               length={res.length}
                              type='uniform'/>;

                ReactDOM.render(list, listDiv);
    });

  }

  handleSearchStr(e){
    this.setState({ searchStr: e.target.value });
    this.searchEvents();
  }

  renderItem(index, key) {
        return <div key={key} className="listItem">
                    <div>{this.state.events[index][1]}</div>
                    <div><button id={this.state.events[index][0]}>Add</button></div>
                </div>;
      }

}

export default Search;