// @flow

import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import {
  TypeaheadMenuComponent,
  TypeaheadItemComponent,
} from 'mango-components';
import { InputComponent, LabelComponent } from '../../signup/components';
import { teamSearchRegColumns } from '../../signup/constants';
import * as styles from '../../signup/styles';

const InputContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: ${rem(600)};

  ${styles.media.lessThan('medium')`
    max-width: none;
  `};
`;

const filterItems = (teams: any, inputValue: any) =>
  teams && inputValue
    ? matchSorter(teams, inputValue, {
        maxRanking: matchSorter.rankings.STARTS_WITH,
      }).slice(0, 10)
    : [];

const mapItemToString = item =>
  item === null ? '' : item[teamSearchRegColumns.teamName];

type $Props = {
  handleOnSelect: Function,
  placeholder?: string,
  teams: any,
};

const TeamSearchForm = (props: $Props) => {
  const { handleOnSelect, teams, placeholder, ...rest } = props;
  return (
    <InputContainer>
      <Downshift
        itemToString={mapItemToString}
        onSelect={handleOnSelect}
        {...rest}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div style={{ position: 'relative' }}>
            <LabelComponent {...getLabelProps()} />
            <InputComponent
              meta={{ error: undefined, touched: undefined }}
              placeholder={placeholder}
              {...getInputProps()}
            />
            <TypeaheadMenuComponent {...getMenuProps()}>
              {isOpen
                ? filterItems(teams, inputValue).map((item, index) => (
                    <TypeaheadItemComponent
                      {...getItemProps({
                        key: item[teamSearchRegColumns.teamId],
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {mapItemToString(item)}
                    </TypeaheadItemComponent>
                  ))
                : null}
            </TypeaheadMenuComponent>
          </div>
        )}
      </Downshift>
    </InputContainer>
  );
};

export default TeamSearchForm;
