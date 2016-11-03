import React from 'react';
require("../resources/css/search.css");
class Search extends React.Component {
      render() {
               return (
               	<div className="box">
                 <div className="container-1">
                   <span className="icon"><i className="fa fa-search"></i></span>
                   <input type="search" id="search" placeholder="Search existing events" />
                 </div>
                 </div>
               );
        }
}

export default Search;