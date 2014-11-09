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
      url: "http://128.199.48.184:5000/kukeri/teams",
      success: function(data) {
        self.setState(data);
      },
      error: function(error) {
        console.error(error);     
      }  
    });
  },
  componentDidMount: function() {
    var self = this;
    this.setInterval(function() {
      $.ajax({
        dataType: "json",
        url: "http://128.199.48.184:5000/kukeri/teams",
        success: function(data) {
          self.setState(data);
        },
        error: function(error) {
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
                <td><img className="podium" src="/images/icon.png"/></td>
                <td>{this.state.Teams[0].team}</td>
                <td>{this.state.Teams[0].score}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.state.Teams[1].team}</td>
                <td>{this.state.Teams[1].score}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.state.Teams[2].team}</td>
                <td>{this.state.Teams[2].score}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.state.Teams[3].team}</td>
                <td>{this.state.Teams[3].score}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.state.Teams[4].team}</td>
                <td>{this.state.Teams[4].score}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>{this.state.Teams[5].team}</td>
                <td>{this.state.Teams[5].score}</td>
              </tr>
              <tr>
                <td>7</td>
                <td>{this.state.Teams[6].team}</td>
                <td>{this.state.Teams[6].score}</td>
              </tr>
              <tr>
                <td>8</td>
                <td>{this.state.Teams[7].team}</td>
                <td>{this.state.Teams[7].score}</td>
              </tr>
              <tr>
                <td>9</td>
                <td>{this.state.Teams[8].team}</td>
                <td>{this.state.Teams[8].score}</td>
              </tr>
              <tr>
                <td>10</td>
                <td>{this.state.Teams[9].team}</td>
                <td>{this.state.Teams[9].score}</td>
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

