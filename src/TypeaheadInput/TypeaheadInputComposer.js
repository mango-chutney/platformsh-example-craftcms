// @flow

import * as React from 'react';
import Downshift from 'downshift';
import type { DownshiftProps } from 'downshift';
import matchSorter from 'match-sorter';
import type { FieldProps as $FieldProps } from 'redux-form';
import { ThemeProvider } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import defaultTheme from './styles';
import type { $FormControlElementConfig } from '../Input/types';

export type $Props = {
  ComposedInputComponent: React.ElementType,
  InputComponent: React.ElementType,
  ItemComponent: React.ElementType,
  MenuComponent: React.ElementType,
  MenuWrapperComponent: React.ElementType,
  WrapperComponent: React.ElementType,
  filterItems: (items: Array<any>, inputValue: any) => Array<any>,
  items: Array<any>,
  label: string | React.ElementConfig<'label'>,
  mapItemToString: (item: any) => string,
  renderItem?: (item: any, index?: number) => React.Node, // defaults to mapItemToString
  createLabelProps: (
    label: string | React.ElementConfig<'label'> | void,
    props: $FormControlElementConfig & $FieldProps,
  ) => React.ElementConfig<'label'>,
  theme: any,
  downshiftProps?: DownshiftProps,
} & $FieldProps;

type $InputWithoutChildren = {
  ...React.ElementConfig<'input'>,
  ...$PropertyType<$FieldProps, 'input'>,
  children?: $PropertyType<React.ElementConfig<'input'>, 'children'>,
};

class TypeaheadInputComposer extends React.Component<$Props> {
  static defaultProps = {
    filterItems: (items: Array<any>, inputValue: string) =>
      matchSorter(items, inputValue, {
        maxRanking: matchSorter.rankings.STARTS_WITH,
      }),

    // Your mapItemToString function will be used as the key for each item, so
    // make sure it's unique.
    mapItemToString: (item: any): string => item || '',

    WrapperComponent: 'div', // Downshift wants to be wrapped in a div.

    theme: defaultTheme,
  };

  handleSelect = (selectedItem: any) => {
    const {
      input: { onChange },
    } = this.props;
    // Unlike `createChangeHandler`, don't compose this with the one from
    // Downshift because the value we are provided is not an event.  We could
    // fake an event, but redux-form does some duck-typing to test whether the
    // argument onChange receives is an event or just a value:
    // https://github.com/erikras/redux-form/blob/2e2a6b02af6083dfda5606fb596d0a189edb9460/src/events/isEvent.js#L3

    // That could also be avoided by setting those properties to something
    // truthy, but I don't think it's worth the maintenance cost (it might
    // change in the future).  Just be aware that if you use something other
    // than redux-form that the 'onChange' prop will be called with a value, not
    // an event.

    // The type signature in redux-form:
    // https://github.com/erikras/redux-form/blob/2811705a22430450540b84cddf429b42b222e28d/src/FieldProps.types.js.flow#L33

    if (typeof onChange === 'function') {
      onChange(selectedItem);
    }
  };

  createChangeHandler = ({
    getInputProps,
  }: {
    getInputProps: (options?: $InputWithoutChildren) => any,
  }): ((event: SyntheticInputEvent<HTMLInputElement>) => void) => event => {
    // Make this event stick around so that we can pass it to other event
    // handlers.
    event.persist();

    const { input } = this.props;

    // Get the original onChange handler passed to this component composed with
    // the one from Downshift.
    const { onChange } = getInputProps({ ...input, children: null });

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  handleStateChange = ({
    inputValue,
    selectedItem,
    type,
  }: {
    inputValue?: string,
    selectedItem?: string,
    type: string,
  }): void => {
    switch (type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem: {
        // Sometimes one of these is defined and the other isn't.
        this.handleSelect(inputValue || selectedItem);
        break;
      }

      /*
      // Don't care about the rest, but they are listed for reference.
      case Downshift.stateChangeTypes.mouseUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
      case Downshift.stateChangeTypes.keydownDownArrowUp:
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.blurInput:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.blurButton:
      case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem:
      case Downshift.stateChangeTypes.touchStart:
      case Downshift.stateChangeTypes.unknown:
      */

      // `changeInput` is already taken care of by passing the `input` prop to
      // the `InputComponent`.
      case Downshift.stateChangeTypes.changeInput:
      default: {
        break;
      }
    }
  };

  renderCallback = ({
    getInputProps,
    getItemProps,
    getLabelProps,
    isOpen,
    inputValue,
    highlightedIndex,
    selectedItem,
  }: {
    getInputProps: (options?: $InputWithoutChildren) => any,
    getLabelProps: (options?: React.ElementConfig<'label'>) => any,
    getItemProps: (options?: {
      [string]: string,
      item: any,
      index?: number,
    }) => any,
    isOpen: boolean,
    inputValue: string,
    highlightedIndex: number | null,
    selectedItem: any,
  }): React.Node => {
    const {
      ComposedInputComponent,
      InputComponent,
      ItemComponent,
      MenuComponent,
      MenuWrapperComponent,
      WrapperComponent,
      createLabelProps,
      filterItems,
      input,
      items,
      label,
      mapItemToString,
      renderItem,
      theme,
      ...rest
    } = this.props;

    const filteredItems = filterItems(items, inputValue);

    const inputProps = {
      ...rest,
      label: createLabelProps(label, getLabelProps()),
      input: {
        ...input,
        ...getInputProps({ ...input, children: null }),
        onChange: this.createChangeHandler({ getInputProps }),
      },
      InputDecoratorComponent: MenuWrapperComponent,
    };

    const createItemProps = (item, index) => ({
      ...getItemProps({
        key: mapItemToString(item),
        index,
        item,
      }),
      index,
      selectedItem,
      highlightedIndex,
    });

    const styleProps = { isOpen, hasItems: filteredItems.length > 0 };

    return (
      <WrapperComponent>
        <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
          <ComposedInputComponent
            {...{ ...inputProps, styleProps, InputComponent }}
          >
            {isOpen &&
              !!filteredItems.length && (
                <MenuComponent {...{ styleProps }}>
                  {filteredItems.map((item, index) => (
                    <ItemComponent
                      {...{ ...createItemProps(item, index), styleProps }}
                    >
                      {typeof renderItem === 'function'
                        ? renderItem(item, index)
                        : mapItemToString(item)}
                    </ItemComponent>
                  ))}
                </MenuComponent>
              )}
          </ComposedInputComponent>
        </ThemeProvider>
      </WrapperComponent>
    );
  };

  render() {
    const { input, mapItemToString, downshiftProps } = this.props;

    return (
      <Downshift
        inputValue={input.value}
        onStateChange={this.handleStateChange}
        itemToString={mapItemToString}
        {...downshiftProps}
      >
        {this.renderCallback}
      </Downshift>
    );
  }
}

export default TypeaheadInputComposer;
