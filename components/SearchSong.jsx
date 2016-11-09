import React from 'react';
import ReactDOM from 'react-dom';
import ReactScrollableList from '../dist/index.js';

require('../resources/css/searchSong.css');
var yt = require('../youtube.js');

var ListEntry = React.createClass({
    propTypes: {
      text: React.PropTypes.string.isRequired
    },

    render: function() {
        return <div>
          {this.props.text}
        </div>;
    }
});

var SearchSong = React.createClass({

      getInitialState: function() {
        return {searchValue: ""};
      },

      inputChanged: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
        this.doSearch(e.target.value);
      },

      doSearch: function(str) {
        var listDiv = document.getElementById('listDiv');

        // delete list if currently present
        if (listDiv != null) {
          listDiv.parentNode.removeChild(listDiv);
        }

        // don't process empty search
        if (str.length == 0) {
          return;
        }

        // generate list
        listDiv = document.createElement('div');
        listDiv.id = 'listDiv';
        listDiv.style.overflow = 'auto';
        listDiv.style.maxHeight = 400;
        listDiv.style.paddingTop = "50px";
        var app = document.getElementById('app');
        app.parentNode.insertBefore(listDiv, app.nextSibling);

        yt.getTitles(str, (res) => {
          let listItems = [];

          for (let i = 0; i < res.length; i++) {
            listItems.push({id: i, content: <ListEntry text={res[i]}/>});
          }

          ReactDOM.render(<ReactScrollableList
          listItems={listItems}
          />, document.getElementById('listDiv'));
        });
      },

      render: function() {
               return (
                <div className="box">
                 <div className="container-1">
                   <span className="icon"><i className="fa fa-search"></i></span>
                   <input type="search" id="search" value={this.state.searchValue} onChange={this.inputChanged.bind(this, "searchValue")} placeholder="Search for a Song" />
                 </div>
                 </div>
               );
        }
});

export default SearchSong;
