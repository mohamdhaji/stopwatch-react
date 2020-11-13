import React, { Component } from "react";

export default class Stopwatch extends Component {
  render() {
    let time = this.props.time;
    return (
      <div className="stopwatch-container">
        <div>
          {time.hours > 0 ? (
            <>
              <span className="cap">{time.hours}</span>
              <span className="small">h</span>
            </>
          ) : null}
          {time.min > 0 ? (
            <>
              <span className="cap">{time.min}</span>
              <span className="small">m</span>
            </>
          ) : null}
          <span className="cap">{time.sec}</span>
          <span className="small">s</span> {time.milli}
        </div>
      </div>
    );
  }
}
