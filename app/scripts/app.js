/** @jsx React.DOM */
// require("./bootstrap/bootstrap.min.js");
$ = require("jquery");

var React = window.React = require('react');
var mountNode = document.getElementById("app");

var KukerLeaderboard = React.createClass({
  componentWillMount: function() {
    $.get("/json/mock.json").success(function(data){
      var teams;
      console.log(data);
      debugger;
    });
    return null;
  },
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


React.render(<KukerLeaderboard />, mountNode);

