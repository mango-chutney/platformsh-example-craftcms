// @flow

import * as React from 'react';
import { Avatar } from 'mango-components';
import Layout from '../../../containers/Layout';

type Props = {};

type State = {};

export class AvatarExample extends React.Component<Props, State> {
  state = {};

  render() {
    return (
      <Layout>
        <h1>Avatar</h1>
        <div>
          <p>Avatar Params</p>
          <ul>
            <li>name</li>
            <li>backgroundImage</li>
            <li>size (width, height, line-height)</li>
            <li>fontSize</li>
          </ul>
        </div>
        <hr />
        <div>
          <p>
            <code>
              {
                // prettier-ignore
                '<Avatar />'
              }
            </code>
          </p>
          <Avatar />
        </div>
        <hr />
        <div>
          <p>
            <code>
              {
                // prettier-ignore
                '<Avatar name="lorem ipsum"/>'
              }
            </code>
          </p>
          <p>background-color based on name</p>
          <Avatar name="Francis" />
          <Avatar name="Francis Martinez" />
          <Avatar name="Tristan" />
          <Avatar name="Jason" />
          <Avatar name="Ruben" />
          <Avatar name="Hannah" />
          <Avatar name="Rowland" />
          <Avatar name="Kelly" />
        </div>
        <hr />
        <div>
          <p>
            <code>
              {
                // prettier-ignore
                '<Avatar backgroundImage="https://placeimg.com/100/100/animals"/>'
              }
            </code>
          </p>
          <Avatar
            name="kelly"
            backgroundImage="https://placeimg.com/100/100/animals"
          />
        </div>
        <hr />
        <div>
          <p>
            <code>
              {
                // prettier-ignore
                '<Avatar width="250px" fontSize="97px"/>'
              }
            </code>
          </p>
          <Avatar name="Cat" width="250px" fontSize="97px" />
          <Avatar
            backgroundImage="https://placeimg.com/250/250/animals?v=2"
            width="250px"
          />
        </div>
      </Layout>
    );
  }
}

export default AvatarExample;
