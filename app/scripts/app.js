/** @jsx React.DOM */
window.$ = require("jquery");
// require("./vendor/bootstrap/bootstrap.min.js");

var React = window.React = require('react');
var mountNode = document.getElementById("app");

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function(fn, ms) {
        this.intervals.push(setInterval(fn, ms));
    },
    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    }
};

var KukerLeaderboard = React.createClass({
  mixins: [SetIntervalMixin],
  componentWillMount: function() {
    var self = this;
    $.ajax({
      dataType: "json",
      url: "/json/mock.json",
      success: function(data) {
        console.log(data);
        self.setState(data);
      },
      error: function(error) {
        debugger;
        console.error(error);     
      }  
    });
  },
  componentDidMount: function() {
    var self = this;

    this.setInterval(function() {
      $.ajax({
        dataType: "json",
        url: "/json/mock.json",
        success: function(data) {
          console.log(data);
          self.setState(data);
        },
        error: function(error) {
          debugger;
          console.error(error);     
        }  
      })
    }, 3000);
  },
  render: function() {
    var elements = !this.state ? null : 
        <div className="table-container">
          <h1> Kuker Leaderboard </h1>
          <table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img className="podium" src="/images/podium.png"/></td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="info">
                <td>3</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="success">
                <td>4</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="danger">
                <td>5</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="warning">
                <td>6</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="active">
                <td>7</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="active">
                <td>8</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="active">
                <td>9</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr className="active">
                <td>10</td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
            </tbody>
          </table>
        </div>
    console.log(this.state);
    return (
      <div>
       {elements}
      </div>
    );
  }
});


React.render(<KukerLeaderboard />, mountNode);

