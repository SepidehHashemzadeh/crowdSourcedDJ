import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import AddSongModal from './addSongModal.jsx';

require('../resources/css/searchSong.css');
var yt = require('../youtube.js');

class SearchSong extends React.Component {

      constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
          searchValue: "",
          results: []
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.doSearch = this.doSearch.bind(this);
      }

      inputChanged(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
        this.doSearch(e.target.value);
      }

      renderItem(index, key) {
        return <div key={key} className="listItem">
                    <div>{this.state.results[index][1]}</div>
                    <div><button id={this.state.results[index][0]} onClick={this.handleAdd}>Add to Queue</button></div>
                </div>;
      }

      handleAdd(event) {
        var listDiv = document.getElementById('listDiv');
        var modalDiv = document.getElementById('modalDiv');

        if (modalDiv == null) {
            modalDiv = document.createElement('div'); 
            modalDiv.id = 'modalDiv';
            listDiv.parentNode.insertBefore(modalDiv, listDiv.nextSibling);
        }

        ReactDOM.render(<AddSongModal eventId={this.props.eventId} id={event.target["id"]} />, document.getElementById('modalDiv'));
      }

      doSearch(str) {
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
        var app = document.getElementById('addSong');
        app.parentNode.insertBefore(listDiv, app.nextSibling);

        yt.search(str, (ids) => {
            yt.getTitles(str, (titles) => {
                // combine ids and titles
                var res = ids.map(function(e, i) {
                    return [e, titles[i]];
                });

                this.setState({results: res});

                var list = <ReactList
                                itemRenderer={this.renderItem}
                                length={this.state.results.length}
                                type='uniform'
                            />;

                ReactDOM.render(list, listDiv);
            });
        });
      }

      render() {
           return (
            <div className="box-2">
             <div className="container-2">
               <span className="icon"><i className="fa fa-search"></i></span>
               <input type="search" id="search" value={this.state.searchValue} onChange={this.inputChanged.bind(this, "searchValue")} placeholder="Search for a Song" />
             </div>
             </div>
           );
        }
}

export default SearchSong;