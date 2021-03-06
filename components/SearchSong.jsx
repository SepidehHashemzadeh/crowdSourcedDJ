import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import Popup from 'react-popup';

require('../resources/css/searchSong.css');
var yt = require('../youtube.js');

class SearchSong extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          searchValue: "",
          results: []
        };

        this.inputChanged = this.inputChanged.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.render = this.render.bind(this);

      }

      inputChanged(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
        this.doSearch(e.target.value);
      }

      showPopup(event) {
        var id = event.target["id"];
        var listDiv = document.getElementById('listDiv');
        var popupDiv = document.createElement('div');

        popupDiv.id = 'popupDiv';

        listDiv.parentNode.insertBefore(popupDiv, listDiv.nextSibling);

        ReactDOM.render(<Popup closeBtn={false}/>, document.getElementById('popupDiv'));

        var eventId = this.props.eventId;
        var callBackFunction = this.props.onSongAdded;
        var emptySearch = this;
        Popup.create({
          title: null,
          content: 'Add song to Music Queue?',
          buttons: {
            right: [{
              text: 'Ok',
              className: 'ok-button',
              action: function (popup) {
                yt.addToPlaylist(eventId, id, (res) => {
                    //console.log(res);
                }, callBackFunction);
                emptySearch.setState({ searchValue: "" });
                emptySearch.doSearch("");
                popup.close();
                popupDiv.parentNode.removeChild(popupDiv);
              }
            }],
            left: [{
              text: 'Cancel',
              className: 'cancel-button',
              action: function (popup) {
                popup.close();
                popupDiv.parentNode.removeChild(popupDiv);
              }
            }]
          }
        });
      }

      renderItem(index, key) {
        return <div key={key} className="listItem hvr-back-pulse2">
                    <a className="searchSongListItemP" 
                    target="_blank" 
                    href={"https://www.youtube.com/watch?v="+this.state.results[index][0]}>
                      <div color="white">{this.state.results[index][1]}</div>
                    </a>
                    <div className="searchSongListItemButton" onClick={this.showPopup} id={this.state.results[index][0]}>+</div>
                </div>;
        this.setState(this.state);
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
                                type='variable'
                                pageSize={5}
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
               <input type="search" id="search" value={this.state.searchValue} onChange={this.inputChanged.bind(this, "searchValue")} placeholder="Search for a song" />
             </div>
             </div>
           );
        }
}

export default SearchSong;
