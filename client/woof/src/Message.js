import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: 0,
      follow: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }

  response_like(response){
  }
  response_follow(reponse){
  }

  render() {
    return (
      <div className="Message">
        <h1> nouveau message fdp </h1>
        <div className="MessageHeader">
          {this.props.message["author_id"]}
          {this.props.message["date"]}
        </div>
        <div className="MessageContent">
          {this.props.message["content"]}
        </div>
        <div className="MessageFooter">
        </div>
      </div>
    )

  }
}

export default Message
