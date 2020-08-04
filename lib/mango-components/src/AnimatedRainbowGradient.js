// @flow

import * as React from 'react';

type $AnimatedRainbowGradientProps = {
  colors: Array<string>,
  duration: string,
};

const AnimatedRainbowGradient = ({
  colors,
  duration,
}: $AnimatedRainbowGradientProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    width="100px"
    height="100px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
    xmlSpace="preserve"
  >
    <defs>
      <linearGradient id="gradient" y2="1" spreadMethod="reflect">
        {colors
          .map((color, index, arr) => ({
            stopProps: {
              stopColor: color,
              offset: `${Math.floor((index / arr.length) * 100)}%`,
            },
            animateProps: {
              values: [
                ...arr.slice(index, arr.length),
                ...arr.slice(0, index),
                color,
              ].join(';'),
              attributeName: 'stop-color',
              repeatCount: 'indefinite',
              dur: duration,
            },
          }))
          .map(({ stopProps, animateProps }) => (
            <stop {...stopProps} key={stopProps.offset}>
              <animate {...animateProps} />
            </stop>
          ))}
      </linearGradient>
    </defs>
    <rect
      fill="url(#gradient)"
      width="100"
      height="100"
      x="0"
      y="0"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

AnimatedRainbowGradient.defaultProps = {
  colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
  duration: '3s',
};

export default AnimatedRainbowGradient;
