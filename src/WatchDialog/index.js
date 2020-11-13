import React, { Component } from "react";
import StopWatch from "./stopwatch";
import Timer from "./timer";

export default class WatchDialog extends Component {
  state = {
    selectedIndex: 0,
    milli: "00",
    sec: "0",
    min: "0",
    hours: "0",
    stop: true,
  };

  start = () => {
    if (this.state.stop) {
      this.setState({ stop: false });
      this.startTimer();
    } else {
      this.setState({ stop: true });
      this.pauseTimer();
    }
  };

  updatedTime;
  difference;
  tInterval;
  savedTime;
  paused = 0;
  running = 0;

  startTimer = () => {
    if (!this.running) {
      this.startTime = new Date().getTime();
      this.tInterval = setInterval(this.getShowTime, 1);
      this.paused = 0;
      this.running = 1;
    }
  };

  pauseTimer = () => {
    clearInterval(this.tInterval);
    this.savedTime = this.difference;
    this.paused = 1;
    this.running = 0;
  };

  resetTimer = () => {
    clearInterval(this.tInterval);
    this.savedTime = 0;
    this.difference = 0;
    this.paused = 0;
    this.running = 0;
    this.setState({ stop: true, milli: "00", sec: "0", min: "0", hours: "0" });
  };

  getShowTime = () => {
    this.updatedTime = new Date().getTime();
    if (this.savedTime) {
      this.difference = this.updatedTime - this.startTime + this.savedTime;
    } else {
      this.difference = this.updatedTime - this.startTime;
    }
    // var days = Math.floor(this.difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor(
      (this.difference % (1000 * 60 * 60)) / (1000 * 60)
    );

    var seconds = Math.floor((this.difference % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((this.difference % (1000 * 60)) / 100);

    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    this.setState({
      milli: milliseconds,
      sec: seconds,
      min: minutes,
      hours: hours,
    });
  };

  render() {
    let time = {
      milli: this.state.milli,
      sec: this.state.sec,
      min: this.state.min,
    };
    return (
      <div className="watch-container">
        <div className="tabs">
          <button className="selectedtab">Stop Watch</button>
          <button>Timer</button>
        </div>

        {this.state.selectedIndex === 0 ? (
          <StopWatch time={time}></StopWatch>
        ) : (
          <Timer></Timer>
        )}
        <div className="buttons">
          <button className="start" onClick={this.start}>
            {this.state.stop ? "Start" : "Stop"}
          </button>
          <button className="reset" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
