import React from 'react'

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
  }
  render() {
    return (
      <div class="searchBar">
        <input type="text" id="searchInput" class="searchBarInput" placeholder="Search Here ..." />
        <button class="searchButton" onClick={this.search()}>
          <i class="fa fa-search"></i>
        </button>
      </div>
    )
  }

  search() {
    let input = document.getElementById("search");
    console.log("OUIII")
    /*connexion au serveur*/
    /* renvoie le résultat des recherches avec input*/
  }
}

export default SearchBar