import React from 'react';
require("./resources/css/homePage.css");
class Search extends React.Component {
      render() {
               return (
               //<div class="box">
               <div class="container-1">
               <span class="icon"><i class="fa fa-search"></i></span>
               <input type="search" id="search" placeholder="Search existing events" />
               </div>
               //</div>
               );
        }
}

export default Search;