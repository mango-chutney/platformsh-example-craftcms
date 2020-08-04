// @flow

import * as React from 'react';
import { tootlipPlacements, Tootlip } from 'mango-components';
import Layout from '../../../containers/Layout';

type Props = {};

type State = {
  exampleBottomPlacementButtonIsActive: boolean,
  exampleButtonIsActive: boolean,
  exampleLeftPlacementButtonIsActive: boolean,
  exampleRightPlacementButtonIsActive: boolean,
  exampleTopPlacementButtonIsActive: boolean,
  isHovering: boolean,
};

export class TootlipExample extends React.Component<Props, State> {
  state = {
    exampleBottomPlacementButtonIsActive: false,
    exampleButtonIsActive: false,
    exampleLeftPlacementButtonIsActive: false,
    exampleRightPlacementButtonIsActive: false,
    exampleTopPlacementButtonIsActive: false,
    isHovering: false,
  };

  render() {
    const {
      exampleBottomPlacementButtonIsActive,
      exampleButtonIsActive,
      exampleLeftPlacementButtonIsActive,
      exampleRightPlacementButtonIsActive,
      exampleTopPlacementButtonIsActive,
      isHovering,
    } = this.state;

    return (
      <Layout>
        <h2>Tootlip</h2>
        <p>
          <span
            onMouseOver={() => {
              this.setState({ isHovering: true });
            }}
            onFocus={() => {
              this.setState({ isHovering: true });
            }}
            onMouseOut={() => {
              this.setState({ isHovering: false });
            }}
            onBlur={() => {
              this.setState({ isHovering: false });
            }}
          >
            Hover on me
            <Tootlip visible={isHovering} placement={tootlipPlacements.auto}>
              Hey
            </Tootlip>
          </span>{' '}
          for a tootlip.
        </p>
        <p>You can use it with buttons too.</p>
        <div>
          <button
            type="button"
            onClick={() => {
              this.setState({
                exampleButtonIsActive: !exampleButtonIsActive,
              });
            }}
          >
            {'Press (･ω´･ )́)'}
            <Tootlip
              visible={exampleButtonIsActive}
              placement={tootlipPlacements.auto}
            >
              Thanks for following the instructions.
            </Tootlip>
          </button>
        </div>
        <p>There are a couple of positioning options.</p>
        <p>
          If it looks like the tooltip is colliding with the edge of the
          viewport, it will try other positions.
        </p>
        <div>
          <button
            type="button"
            onClick={() => {
              this.setState({
                exampleRightPlacementButtonIsActive: !exampleRightPlacementButtonIsActive,
              });
            }}
          >
            {'Right (･ω´･ )́)'}
            <Tootlip
              visible={exampleRightPlacementButtonIsActive}
              placement={tootlipPlacements.right}
            >
              Mango Chutney
            </Tootlip>
          </button>
          <button
            type="button"
            onClick={() =>
              this.setState({
                exampleLeftPlacementButtonIsActive: !exampleLeftPlacementButtonIsActive,
              })
            }
          >
            {'Left (･ω´･ )́)'}
            <Tootlip
              visible={exampleLeftPlacementButtonIsActive}
              placement={tootlipPlacements.left}
            >
              Among Chutney
            </Tootlip>
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({
                exampleTopPlacementButtonIsActive: !exampleTopPlacementButtonIsActive,
              });
            }}
          >
            {'Top (･ω´･ )́)'}
            <Tootlip
              visible={exampleTopPlacementButtonIsActive}
              placement={tootlipPlacements.top}
            >
              Ace Gunny Moth
            </Tootlip>
          </button>
          <button
            type="button"
            onClick={() =>
              this.setState({
                exampleBottomPlacementButtonIsActive: !exampleBottomPlacementButtonIsActive,
              })
            }
          >
            {'Bottom (･ω´･ )́)'}
            <Tootlip
              visible={exampleBottomPlacementButtonIsActive}
              placement={tootlipPlacements.bottom}
            >
              Cage Ohm Tunny
            </Tootlip>
          </button>
        </div>
      </Layout>
    );
  }
}

export const component = TootlipExample;

export default component;
