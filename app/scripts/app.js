/** @jsx React.DOM */
// require("./bootstrap/bootstrap.min.js");

var React = window.React = require('react');
var mountNode = document.getElementById("app");

var KukerLeaderboard = React.createClass({
  onChange: function(e) {
    // this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <div>
        <h1> Kuker Leaderboard </h1>
      </div>
    );
  }
});


React.renderComponent(<KukerLeaderboard />, mountNode);

