import React from 'react'

class Logout extends React.Component {
  logout = () => {
    this.props.logout();
  }

  render() {
    return (
      <button className="logoutButton" onClick={this.logout}>
        Logout
      </button>
    )
  }
}

export default Logout
