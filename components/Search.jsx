import React from 'react';
require("../resources/css/search.css");
class Search extends React.Component {
      render() {
               return (
               <div className="container-1">
               <span class="icon"><i class="fa fa-search"></i></span>
               <input type="search" id="search" placeholder="Search existing events" />
               </div>
               );
        }
}

export default Search;