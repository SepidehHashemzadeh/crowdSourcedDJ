import React from 'react';

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
        console.log(str);
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
