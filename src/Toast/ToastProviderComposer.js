// @flow

import * as React from 'react';
import once from 'lodash/once';
import { Portal } from 'react-portal';
import Transition, {
  UNMOUNTED,
  EXITED,
  ENTERING,
  ENTERED,
  EXITING,
} from 'react-transition-group/Transition';
import noop from 'lodash/noop';

export const transitionStates = {
  UNMOUNTED,
  EXITED,
  ENTERING,
  ENTERED,
  EXITING,
};

export type $TransitionState = $Values<typeof transitionStates>;

export type $Toast = React.ComponentType<{
  transitionState: $TransitionState,
  dismiss: () => void,
  children?: React.Node,
}>;

type $EndHandler = (node: HTMLElement, done: () => void) => void;
type $EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;
type $ExitHandler = (node: HTMLElement) => void;

type $Timeout = ?(number | {| enter: number, exit: number |});

// Props that will be passed to 'react-transition-group/Transition'
type $TransitionProps = {
  appear?: boolean,
  enter?: boolean,
  exit?: boolean,
  mountOnEnter?: boolean,
  unmountOnExit?: boolean,
  onEnter?: $EnterHandler,
  onEntering?: $EnterHandler,
  onEntered?: $EnterHandler,
  onExit?: $ExitHandler,
  onExiting?: $ExitHandler,
  onExited?: $ExitHandler,
  timeout: $Timeout,
  addEndListener?: $EndHandler,
};

export type $ToastOptions = {
  ...$TransitionProps,
  persistent?: boolean,
};

export type $Props = {
  children: React.Node,
  defaultToastOptions?: $ToastOptions,
  PortalComponent: React.ElementType,
};

type $ToastProviderState = {
  toasts: {
    [string]: {
      toast: $Toast,
      options: $ToastOptions,
      in: boolean,
    },
  },
};

export type $ToastContext = {
  createToast: (
    toast: $Toast,
    options: ?{
      ...$ToastOptions,
      timeout?: $PropertyType<$ToastOptions, 'timeout'>,
    },
  ) => void,
};

const defaultToastContext: $ToastContext = {
  createToast: noop,
};

const ToastContext = React.createContext(defaultToastContext);

export const ToastConsumer = ToastContext.Consumer;

const createToast = (
  toast: $Toast,
  options: $ToastOptions,
  id: number | string,
) => (state: $ToastProviderState): $ToastProviderState => ({
  ...state,
  toasts: {
    ...state.toasts,
    [id]: {
      options,
      toast,
      in: true,
    },
  },
});

const removeToast = (id: string) => (
  state: $ToastProviderState,
): $ToastProviderState => ({
  ...state,
  toasts: Object.entries(state.toasts)
    .filter(([key]) => String(id) !== key)
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {}),
});

const toggleToastState = (id: string) => (
  state: $ToastProviderState,
): $ToastProviderState => ({
  ...state,
  toasts: {
    ...state.toasts,
    [id]: {
      ...state.toasts[id],
      in: !state.toasts[id].in,
    },
  },
});

// eslint-disable-next-line no-underscore-dangle
let __toastId = -1;

class ToastProviderController extends React.Component<
  $Props,
  $ToastProviderState,
> {
  static defaultProps = {
    PortalComponent: Portal,
    defaultToastOptions: {
      timeout: { enter: 1000, exit: 1000 },
      unmountOnExit: true,
      appear: true,
    },
  };

  state = {
    toasts: {},
  };

  createToastContextValue = (): $ToastContext => ({
    createToast: (toast: $Toast, options: ?$ToastOptions): void => {
      const { defaultToastOptions } = this.props;

      __toastId += 1;

      this.setState(
        createToast(toast, { ...defaultToastOptions, ...options }, __toastId),
      );
    },
  });

  renderToasts = () => {
    const { toasts } = this.state;

    return (
      <>
        {Object.keys(toasts).map(id => {
          const { toast: Component, options, in: inProp } = toasts[id];

          const dismiss = once(() => this.setState(toggleToastState(id)));

          const transitionProps = {
            ...options,
            in: inProp,
            onEntered: (...args) => {
              if (typeof options.onEntered === 'function') {
                options.onEntered(...args);
              }
              if (!options.persistent) {
                dismiss();
              }
            },
            onExited: (...args) => {
              if (typeof options.onExited === 'function') {
                options.onExited(...args);
              }
              this.setState(removeToast(id));
            },
          };

          return (
            <Transition {...transitionProps} key={id}>
              {transitionState => (
                <Component {...{ transitionState, dismiss }} />
              )}
            </Transition>
          );
        })}
      </>
    );
  };

  render() {
    const { children, PortalComponent } = this.props;

    return (
      <ToastContext.Provider value={this.createToastContextValue()}>
        <PortalComponent>{this.renderToasts()}</PortalComponent>
        {children}
      </ToastContext.Provider>
    );
  }
}

export default ToastProviderController;
