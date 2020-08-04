import * as React from 'react';
import { Manager } from 'react-popper';

class ParentNodeManager extends Manager {
  state = { shouldRender: false };

  anchorChild = null;

  _setTargetNode = node => {
    this.anchorChild = node;
  };

  _getTargetNode = () => this.anchorChild.parentNode;

  componentDidMount() {
    // Hack to get this node to mount BEFORE the nodes rendered by
    // super.render() (otherwise this.anchorChild.parentNode will be null).
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ shouldRender: true });
  }

  componentWillUnmount() {
    this.setState({ shouldRender: false });
  }

  render() {
    const { shouldRender } = this.state;

    return (
      // eslint-disable-next-line no-underscore-dangle
      <span ref={this._setTargetNode}>{shouldRender && super.render()}</span>
    );
  }
}

export default ParentNodeManager;
