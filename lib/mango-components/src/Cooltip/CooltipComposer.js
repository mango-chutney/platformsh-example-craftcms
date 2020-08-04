// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import defaultsDeep from 'lodash/defaultsDeep';
import omit from 'lodash/omit';
import { ThemeProvider } from 'styled-components';
import type { FieldProps as $FieldProps } from 'redux-form';
import CoolChild from './CoolChild';
import OtherChild from './OtherChild';
import defaultTheme from './styles';

const defaultOtherChildInputFormatter = (input: string) => {
  if (/^\$[^$]/.test(input)) {
    return input;
  }
  if (/^\$+/.test(input)) {
    return input.replace(/^\$+/, '$');
  }
  return `$${input || ''}`;
};

const defaultOtherChildInputDeformatter = (input: string) =>
  input.replace(/\$/, '');

function mergeCoolChildren(coolChildren: any, otherChild: any) {
  if (!otherChild) {
    return coolChildren;
  }

  return [...coolChildren, otherChild];
}

function isOtherChild(
  component:
    | React.Element<typeof CoolChild>
    | React.Element<typeof OtherChild>
    | any,
): boolean {
  // $FlowFixMe
  return component.type.displayName === OtherChild.displayName;
}

export type $Props = {
  children?: any,
  ComposedInputComponent: React.ElementType,
  ComposedSelectComponent: React.ElementType,
  coolChildren: Array<typeof CoolChild>,
  CoolChildrenWrapperComponent: React.ElementType,
  CoolChildrenWrapperComponent: React.ElementType,
  cooltipLabel?: string => string,
  CooltipWrapperComponent: React.ElementType,
  deformatOtherChild: string => string,
  formatOtherChild: string => string,
  handleChange: (value: any) => any,
  initialize: () => any,
  initialValue: any,
  LabelComponent: React.ElementType,
  mapItemToString: (item: any) => string,
  meta: $PropertyType<$FieldProps, 'meta'>,
  otherChild?: typeof OtherChild,
  PipComponent: React.ElementType,
  selectLabel?: string,
  SelectWrapperComponent: React.ElementType,
  theme: any,
  TiptextComponent: React.ElementType,
  TiptextWrapperComponent: React.ElementType,
} & $FieldProps;

type $State = {
  activeIndex: number,
};

class Cooltip extends React.Component<$Props, $State> {
  static findActiveIndex(value, nextProps) {
    const { otherChild, coolChildren } = nextProps;

    const mergedCoolChildren = mergeCoolChildren(coolChildren, otherChild);

    const maybeActiveIndex = mergedCoolChildren.findIndex(
      (child: any) => child.props.value === value,
    );

    const activeIndex =
      maybeActiveIndex > -1
        ? maybeActiveIndex
        : mergedCoolChildren.findIndex(isOtherChild);

    if (activeIndex === -1) {
      throw new Error(
        'Unable to find active index, please set an initial value',
      );
    }

    return activeIndex;
  }

  static defaultProps = {
    mapItemToString: (item: any): string => item || '',
    theme: defaultTheme,
    formatOtherChild: defaultOtherChildInputFormatter,
    deformatOtherChild: defaultOtherChildInputDeformatter,
  };

  state = { activeIndex: -1 };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { input } = nextProps;

    const { activeIndex: oldActiveIndex } = prevState;

    if (oldActiveIndex === -1) {
      return {
        activeIndex: Cooltip.findActiveIndex(input.value, nextProps),
      };
    }

    return null;
  }

  renderNormalMode() {
    const {
      coolChildren,
      CoolChildrenWrapperComponent,
      handleChange,
      meta,
      otherChild,
    } = this.props;

    const { activeIndex } = this.state;

    const mergedCoolChildren = mergeCoolChildren(coolChildren, otherChild);

    return (
      <CoolChildrenWrapperComponent>
        {mergedCoolChildren.map((ChildComponent: any, index) =>
          React.cloneElement(ChildComponent, {
            onClick: e => {
              e.persist();

              handleChange(ChildComponent.props.value)();

              this.setState({
                activeIndex: Cooltip.findActiveIndex(
                  e.target.value || '',
                  this.props,
                ),
              });
            },
            meta,
            key: String(ChildComponent.props.value || index),
            active: index === activeIndex,
          }),
        )}
      </CoolChildrenWrapperComponent>
    );
  }

  renderTinyMode() {
    const {
      ComposedSelectComponent,
      SelectWrapperComponent,
      coolChildren,
      input,
      meta,
      otherChild,
      selectLabel,
      theme, // remove theme to not clobber parent theme
      ...rest
    } = this.props;

    const { activeIndex } = this.state;

    const mergedCoolChildren = mergeCoolChildren(coolChildren, otherChild);

    const inputProps = {
      ...rest,
      input: {
        ...input,
        value:
          activeIndex === mergedCoolChildren.length - 1 && otherChild
            ? ''
            : mergedCoolChildren[activeIndex].props.value,
      },
      meta,
    };

    return (
      <SelectWrapperComponent>
        <ComposedSelectComponent
          {...{
            ...omit(inputProps, ['input.onChange', 'input.onBlur']),
          }}
          name={`${input.name}-select`}
          id={`${input.name}-select`}
          label={selectLabel}
          onChange={e => {
            e.persist();

            inputProps.input.onChange(e.target.value || '');

            this.setState({
              activeIndex: Cooltip.findActiveIndex(
                e.target.value || '',
                this.props,
              ),
            });
          }}
        >
          {mergedCoolChildren.map((ChildComponent: any, index) => (
            <option
              value={ChildComponent.props.value || ''}
              key={String(ChildComponent.props.value || index)}
            >
              {ChildComponent.props.label}
            </option>
          ))}
        </ComposedSelectComponent>
      </SelectWrapperComponent>
    );
  }

  render() {
    const {
      children,
      ComposedInputComponent,
      ComposedSelectComponent,
      coolChildren,
      CoolChildrenWrapperComponent,
      cooltipLabel,
      CooltipWrapperComponent,
      deformatOtherChild,
      formatOtherChild,
      handleChange,
      input,
      LabelComponent,
      meta,
      otherChild,
      PipComponent,
      theme,
      TiptextComponent,
      TiptextWrapperComponent,
      ...rest
    } = this.props;

    const { activeIndex } = this.state;

    const inputProps = omit(
      {
        ...rest,
        input: {
          ...input,
          value: formatOtherChild(input.value),
        },
        meta,
      },
      ['input.onChange', 'input.onBlur'],
    );

    const mergedCoolChildren = mergeCoolChildren(coolChildren, otherChild);

    const activeCoolChild: any = mergedCoolChildren[activeIndex];

    return (
      mergedCoolChildren && (
        <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
          <CooltipWrapperComponent
            aria-labelledby={cooltipLabel && `${input.name}-outer-label`}
          >
            {cooltipLabel && (
              <LabelComponent id={`${input.name}-outer-label`}>
                {cooltipLabel}
              </LabelComponent>
            )}
            {this.renderNormalMode()}
            {this.renderTinyMode()}
            {activeCoolChild && (
              <TiptextWrapperComponent>
                {activeCoolChild.props.children && (
                  <>
                    <PipComponent
                      coolChildrenLength={mergedCoolChildren.length}
                      activeIndex={activeIndex}
                    />
                    <TiptextComponent>
                      {activeCoolChild.props.children}
                    </TiptextComponent>
                  </>
                )}
                {isOtherChild(activeCoolChild) && (
                  <ComposedInputComponent
                    {...{ ...inputProps }}
                    name={`${input.name}-input`}
                    id={`${input.name}-input`}
                    onChange={e => {
                      input.onChange(deformatOtherChild(e.target.value) || '');
                    }}
                  />
                )}
              </TiptextWrapperComponent>
            )}
            {children}
          </CooltipWrapperComponent>
        </ThemeProvider>
      )
    );
  }
}

const mapDispatchToProps = (
  dispatch: (actionCreator: any) => void,
  ownProps: $Props,
) => ({
  handleChange(value) {
    return () => {
      dispatch(change(ownProps.meta.form, ownProps.input.name, value));
    };
  },
  initialize() {
    return dispatch(
      change(ownProps.meta.form, ownProps.input.name, ownProps.initialValue),
    );
  },
});

export default connect(
  undefined,
  // $FlowFixMe
  mapDispatchToProps,
)(Cooltip);
