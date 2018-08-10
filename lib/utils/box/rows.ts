import get from 'lodash.get';
import * as React from 'react';

import Box from '../../components/Box';

interface IProps {
  rows?: number[];
  children?: React.ReactNode;
}

export const boxRowsUtils = (props: IProps) => {
  let newChild = props.children;

  const rows = get(props, 'rows');

  if (rows && Array.isArray(rows)) {
    let index = 0;
    newChild = React.Children.map(
      props.children,
      (child: React.ReactElement<any>) => {
        if (child.type === Box) {
          return React.cloneElement(child, {
            f: rows[index] || 1,
          });
        }

        throw new Error('Each child for a Box with rows need to be a Box');
      },
    );
  }

  return newChild;
};
