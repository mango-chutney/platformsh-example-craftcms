// @flow

import * as React from 'react';
import { rem } from 'polished';
import selectColor from './selectColor';

export type $Props = {
  AvatarComponent: React.ElementType,
  backgroundImage?: string,
  children?: React.Node,
  name?: string,
  style?: { [string]: string },
};

const AvatarComposer = (props: $Props) => {
  const {
    AvatarComponent,
    backgroundImage,
    children,
    name,
    style,
    ...rest
  } = props;

  return (
    <AvatarComponent
      {...rest}
      style={{
        backgroundColor: name && selectColor(name),
        backgroundImage: backgroundImage && `url(${backgroundImage})`,
        ...style,
      }}
    >
      {(!backgroundImage && name && name.charAt(0)) || children}
    </AvatarComponent>
  );
};

AvatarComposer.defaultProps = {
  width: rem(46),
  fontSize: rem(18),
};

export default AvatarComposer;
