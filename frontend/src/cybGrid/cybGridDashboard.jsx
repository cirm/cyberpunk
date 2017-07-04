import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import connect from 'react-redux/lib/connect/connect';
import { Redirect } from 'react-router-dom';
import { loadGrid } from './cybGridActionCreators';
import { CybGridTable } from './cybGridTable';

export class Grid extends React.PureComponent {
  componentDidMount() {
    return this.props.dispatch(loadGrid());
  }

  render() {
    return this.props.display ? (
      <div>
        {this.props.side ?
          <CybGridTable
            side={this.props.side}
            cells={this.props.cells}
          >jabba dabba doo
          </CybGridTable> : <p>no data</p>}
      </div>) : <Redirect to="/" />;
  }
}

Grid.defaultProps = {
  cells: [],
};

Grid.propTypes = {
  cells: ImmutablePropTypes.list,
  side: ImmutablePropTypes.map,
};

function mapStateToProps(state) {
  return {
    display: state.getIn(['profile', 'username']),
    cells: state.getIn(['grid', 'cells']),
    side: state.getIn(['grid', 'side']),
  };
}

export const GridContainer = connect(
  mapStateToProps,
)(Grid);
