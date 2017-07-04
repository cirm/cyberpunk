import React from 'react';
import range from 'lodash/fp/range';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import { Line } from './cybGridLine';

export const CybGridTable = props => (
  <div >
    {map(item => (
      <div >
        <Line
          line={item}
          cells={reduce((result, val) => {
            result.push(props.cells.get(val));
            return result;
          }, [])(range(item * props.side)((item + 1) * props.side))}
        />
      </div >),
    )(range(0)(props.side))}
  </div >
);
