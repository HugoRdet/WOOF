import React from 'react'

class LogoutButton extends React.Component {
  render() {
    return (
      <button className="logoutButton" onClick={this.props.setLogout}>
        Logout
      </button>
    )
  }
}

export default LogoutButton
