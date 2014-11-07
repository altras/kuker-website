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
              <tr className="warning">
                <td><img className="podium" src="/images/podium_white.png"/></td>
                <td>{this.state.teams[0].teamName}</td>
                <td>{this.state.teams[0].points}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.state.teams[1].teamName}</td>
                <td>{this.state.teams[1].points}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.state.teams[2].teamName}</td>
                <td>{this.state.teams[2].points}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.state.teams[3].teamName}</td>
                <td>{this.state.teams[3].points}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.state.teams[4].teamName}</td>
                <td>{this.state.teams[4].points}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>{this.state.teams[5].teamName}</td>
                <td>{this.state.teams[5].points}</td>
              </tr>
              <tr>
                <td>7</td>
                <td>{this.state.teams[6].teamName}</td>
                <td>{this.state.teams[6].points}</td>
              </tr>
              <tr>
                <td>8</td>
                <td>{this.state.teams[7].teamName}</td>
                <td>{this.state.teams[7].points}</td>
              </tr>
              <tr>
                <td>9</td>
                <td>{this.state.teams[8].teamName}</td>
                <td>{this.state.teams[8].points}</td>
              </tr>
              <tr>
                <td>10</td>
                <td>{this.state.teams[9].teamName}</td>
                <td>{this.state.teams[9].points}</td>
              </tr>
            </tbody>
          </table>
        </div>
    return (
      <div>
       {elements}
      </div>
    );
  }
});


React.render(<KukerLeaderboard />, mountNode);

