import React from 'react';
import CellPicker from './cybGameCellPicker';

export class TrackerTool extends React.PureComponent {
  render() {
    return (<CellPicker display={this.props.display} />);
  }
}
