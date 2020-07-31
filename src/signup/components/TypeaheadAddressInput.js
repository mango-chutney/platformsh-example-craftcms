// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import matchSorter from 'match-sorter';
import styled from 'styled-components';
import { TypeaheadInput, Tootlip } from 'mango-components';
import type { FieldProps } from 'redux-form';
import type { $State as $AppState } from '../reducers';
import { kleberActionCreators } from '../actions';
import { formKeys } from '../constants';
import { Column, Row, Input, InputComponent } from '.';
import type { $Dispatch } from '../actions';

const filterItems = (items, inputValue) => [
  ...(items
    ? matchSorter(items, inputValue, {
        keys: ['AddressLine', 'State', 'Postcode', 'Locality'],
        maxRanking: matchSorter.rankings.STARTS_WITH,
        threshold: matchSorter.rankings.NO_MATCH,
      })
    : []),
  {
    AddressLine: '',
    Locality: '',
    Postcode: '',
    isManualAddressButton: true,
  }, // adding blank item for custom button
];

const mapItemToString = item =>
  item === null ? '' : `${item.AddressLine}, ${item.Locality} ${item.Postcode}`;

const mapStateToProps = (state: $AppState) => ({
  items: state.kleber.addressData.Result,
});

const mapDispatchToProps = (dispatch: $Dispatch) => ({
  getAddressData(address: string) {
    dispatch(kleberActionCreators.getAddressData(address));
  },

  saveAddressData(
    address: string,
    items: $ElementType<
      $ElementType<$ElementType<$AppState, 'kleber'>, 'addressData'>,
      'Result',
    >,
  ) {
    const addressRecord = Array.isArray(items)
      ? items.find(item => mapItemToString(item) === address)
      : undefined;

    const recordId =
      addressRecord === undefined ? null : addressRecord.RecordId;
    const addressLine =
      addressRecord === undefined ? address : addressRecord.AddressLine;
    const city = addressRecord === undefined ? '' : addressRecord.Locality;
    const postcode = addressRecord === undefined ? '' : addressRecord.Postcode;

    dispatch(change(formKeys.registration, 'addressLine', addressLine));
    dispatch(change(formKeys.registration, 'suburb', city));
    dispatch(change(formKeys.registration, 'postcode', postcode));
    dispatch(kleberActionCreators.updateAddressRecordId(recordId));
  },

  saveAddressLine(addressLine: string) {
    dispatch(change(formKeys.registration, 'address', addressLine));
    dispatch(change(formKeys.registration, 'addressLine', addressLine));
  },
});

const StyledTypeaheadInput = styled(TypeaheadInput)`
  + div {
    margin-top: -4px;
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (
    props: {
      label: string,
      column: string,
      items: Array<any>,
      placeholder?: string,
      getAddressData: (address: string) => void,
      saveAddressData: (
        address: string,
        items: $ElementType<
          $ElementType<$ElementType<$AppState, 'kleber'>, 'addressData'>,
          'Result',
        >,
      ) => void,
      saveAddressLine: (addressLine: string) => void,
      manualAddressOnChange?: Function,
      tooltipVisible?: boolean,
    } & FieldProps,
  ) => {
    const {
      items,
      getAddressData,
      saveAddressData,
      saveAddressLine,
      manualAddressOnChange,
      input,
      meta,
      placeholder,
      label,
      column,
      tooltipVisible,
      ...rest
    } = props;

    const handleChange = (eventOrValue: any) => {
      if (typeof eventOrValue === 'string') {
        // When this is a string, it means that the user selected a value.
        // Instead of getting the address data for this event or value, we need
        // to save the record ID so that we can report back to Kleber when the
        // form is submitted (some kind of data licensing condition).
        //
        // The Kleber action creator will find the data associated with this
        // string and save the record ID in the store.
        saveAddressData(eventOrValue, items);
        input.onChange(eventOrValue);
      } else {
        saveAddressData(eventOrValue.target.value, undefined);
        eventOrValue.persist();
        getAddressData(eventOrValue.target.value);
        input.onChange(eventOrValue);
      }
    };

    const manualAddressTitle = 'I will enter my full address manually';

    return (
      <Row>
        <Column column={column}>
          <StyledTypeaheadInput
            {...{
              ...rest,
              input: { ...input, onChange: handleChange },
              meta,
              label,
              items: items || [],
              filterItems,
              mapItemToString,
              renderItem: (item: any) =>
                item.isManualAddressButton
                  ? manualAddressTitle
                  : mapItemToString(item),
              placeholder,
              ComposedInputComponent: Input,
              InputComponent,
              downshiftProps: {
                onChange: (selectedItem: any, stateAndHelpers: any) => {
                  if (selectedItem.isManualAddressButton) {
                    saveAddressLine(stateAndHelpers.inputValue);
                    if (
                      manualAddressOnChange !== undefined &&
                      typeof manualAddressOnChange === 'function'
                    ) {
                      manualAddressOnChange();
                    }
                  }
                },
              },
            }}
          />
          <Tootlip {...{ meta }} visible={tooltipVisible} />
        </Column>
      </Row>
    );
  },
);
