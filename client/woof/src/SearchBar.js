import React from 'react';
import axios from 'axios';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput : "",
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  render(){
    return (
      <div className="searchbar">
          <div className="searchInput">
            <input type="text" name="searchInput" className="s_inmp" onChange={this.handleChange}value={this.state.searchInput}/>
            <section className="petitbouton_s" onClick={ event => this.props.search(this.state.searchInput) }>🔍</section>
          </div>
      </div>
    )    
  };
}

export default SearchBar;


