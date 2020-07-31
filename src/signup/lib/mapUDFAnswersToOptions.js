// @flow

import * as React from 'react';

export default (answers: Array<{ AnswerID: number, Text: string }>) =>
  answers.length < 0
    ? []
    : answers.map(({ AnswerID, Text }) => (
        <option key={AnswerID} value={AnswerID}>
          {Text}
        </option>
      ));
