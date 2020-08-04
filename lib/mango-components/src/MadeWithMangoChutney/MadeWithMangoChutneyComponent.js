// @flow

import * as React from 'react';
import {
  mango_chutney as MangoChutney,
  made_with as MadeWith,
} from './MangoChutneyLogoPaths.json';

const MangoChutneyPath: string = MangoChutney.join(' ');
const MadeWithPath: string = MadeWith.join(' ');

const MangoChutneyLogo = ({
  width,
  height,
  fill,
  ...rest
}: {
  height: number | string,
  width: number | string,
  fill: string,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    {...rest}
  >
    <g fill={fill} fillRule="evenodd">
      <g opacity={0.75}>
        <path d={MangoChutneyPath} />
      </g>
      <g opacity={0.2}>
        <path d={MadeWithPath} />
      </g>
    </g>
  </svg>
);

MangoChutneyLogo.defaultProps = {
  width: 180,
  height: 15,
  fill: '#222C3C',
};

export default MangoChutneyLogo;
