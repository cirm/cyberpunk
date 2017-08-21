import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import { TrackerTool } from './components/cybGameTrackerTool';

export class GameDashboard extends React.PureComponent {

  hasPaths() {
    if (!this.props.trackedCells) return false;
    console.log(this.props.trackedCells);
    return false;
  }

  render() {
    return (
      <TrackerTool display={this.props.display} />
    );
  }
}

function mapStateToProps(state) {
  return {
    display: state.getIn(['profile', 'username']),
    trackedCells: state.getIn(['game', 'trackedCells']),
  };
}


export const GameContainer = connect(
  mapStateToProps,
)(GameDashboard);
