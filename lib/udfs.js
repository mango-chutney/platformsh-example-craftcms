/*
 * @flow
 */

const invert = require('lodash/invert');
const keys = require('lodash/keys');
const caseless = require('caseless');

/*::
import type {
  EventId,
  Answer,
  AnswerId,
  AnswerKey,
  Question,
  QuestionId,
  QuestionKey,
  QuestionKeysMap,
  AnswerKeysMap,
  AnswerKeysToAnswerIdsMap,
  AnswerIdsToAnswerKeysMap,
  QuestionIdsToAnswerIdsMap,
  QuestionKeysToQuestionIdsMap,
  QuestionIdsToQuestionKeysMap,
  AnswerIdsToQuestionIdsMap,
  AnswerKeysToQuestionKeysMap,
  UDFMap,
  MultiUDFMap,
  EventUDF,
  EventUDFs,
  RegistrantUDFs,
  UDFResponses,
  BoundEventUDFs,
} from './types';
*/

const withoutDuplicateEventUDFs = (eventUDFs /* : EventUDFs */) =>
  eventUDFs
    .sort((
      { QuestionID: a } /* : EventUDF */,
      { QuestionID: b } /* : EventUDF */
    ) => {
      // Sort ascending, so we can remove duplicates more easily
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }
      return 0;
    })
    .reduce((prev /* : EventUDFs */, next /* : EventUDF */) => {
      if (prev[prev.length - 1] === undefined) {
        return [next];
      } else if (prev[prev.length - 1].QuestionID === next.QuestionID) {
        return [...prev];
      }
      return [...prev, next];
    });

function mapEventUDFs(
  eventUDFs /* : EventUDFs */
) /* : {
    answerIdsToAnswerKeys: AnswerIdsToAnswerKeysMap,
    questionIdsToAnswerIds: QuestionIdsToAnswerIdsMap,
    questionKeysToQuestionIds: QuestionKeysToQuestionIdsMap,
  }*/ {
  const questionKeysToQuestionIds = {};
  const questionIdsToAnswerIds = {};
  const answerIdsToAnswerKeys = {};

  withoutDuplicateEventUDFs(
    eventUDFs
  ).forEach(({ Answers, QuestionID, Text: Question, Type }) => {
    questionKeysToQuestionIds[Question] = String(QuestionID);
    questionIdsToAnswerIds[String(QuestionID)] = Answers.map(({ AnswerID }) =>
      String(AnswerID)
    );
    Answers.forEach(({ AnswerID, Text }) => {
      answerIdsToAnswerKeys[String(AnswerID)] = (() => {
        switch (Type) {
          // Types that can have one or more answers.
          case 'DropDown':
          case 'Checkbox':
          case 'RadioButton': {
            return Text;
          }

          // Types that can have only one answer.
          case 'Text':
          case 'TextArea':
          case 'Dateddmmyy':
          case 'Datemmddyy':
          default: {
            return Question;
          }
        }
      })();
    });
  });

  return {
    answerIdsToAnswerKeys,
    questionIdsToAnswerIds,
    questionKeysToQuestionIds,
  };
}

// class UDFsWrapper {

// }

function makeUdfQuestionKeys(
  {
    udfQuestionKeysToQuestionIds,
  } /* : {| udfQuestionKeysToQuestionIds: QuestionKeysToQuestionIdsMap |} */
) /* : QuestionKeysMap */ {
  return keys(udfQuestionKeysToQuestionIds).reduce(
    (prev, next) => ({ ...prev, [next]: next }),
    {}
  );
}

function makeUdfAnswerKeys(
  {
    udfAnswerIdsToAnswerKeys,
  } /* : {| udfAnswerIdsToAnswerKeys: AnswerIdsToAnswerKeysMap |} */
) /* : AnswerKeysMap */ {
  return keys(udfAnswerIdsToAnswerKeys)
    .map(key => udfAnswerIdsToAnswerKeys[key])
    .reduce((prev, next) => ({ ...prev, [next]: next }), {});
}

function makeUdfAnswerKeysToAnswerIds(
  {
    udfAnswerIdsToAnswerKeys,
  } /* : {| udfAnswerIdsToAnswerKeys: AnswerIdsToAnswerKeysMap |} */
) /* : AnswerKeysToAnswerIdsMap */ {
  return invert(udfAnswerIdsToAnswerKeys);
}

function makeUdfQuestionIdsToQuestionKeys(
  {
    udfQuestionKeysToQuestionIds,
  } /* : {| udfQuestionKeysToQuestionIds: QuestionKeysToQuestionIdsMap |} */
) /* : QuestionIdsToQuestionKeysMap */ {
  return invert(udfQuestionKeysToQuestionIds);
}

function makeUdfAnswerIdsToQuestionIds(
  {
    udfQuestionIdsToAnswerIds,
  } /* : {| udfQuestionIdsToAnswerIds: QuestionIdsToAnswerIdsMap |} */
) /* : AnswerIdsToQuestionIdsMap */ {
  return keys(invert(udfQuestionIdsToAnswerIds))
    .map(key =>
      key.split(',').map(answerId => ({
        [answerId]: invert(udfQuestionIdsToAnswerIds)[key],
      }))
    )
    .reduce((prev, next) => [...prev, ...next], [])
    .reduce((prev, next) => ({ ...prev, ...next }), {});
}

function makeUdfAnswerKeysToQuestionKeys(
  {
    udfQuestionIdsToQuestionKeys,
    udfAnswerKeysToAnswerIds,
    udfAnswerIdsToQuestionIds,
  } /* : {|
  udfQuestionIdsToQuestionKeys: QuestionIdsToQuestionKeysMap,
  udfAnswerKeysToAnswerIds: AnswerKeysToAnswerIdsMap,
  udfAnswerIdsToQuestionIds: AnswerIdsToQuestionIdsMap,
  |}*/
) /* : AnswerKeysToQuestionKeysMap */ {
  return keys(udfAnswerKeysToAnswerIds)
    .map(key => ({
      [key]:
        udfQuestionIdsToQuestionKeys[
          udfAnswerIdsToQuestionIds[udfAnswerKeysToAnswerIds[key]]
        ],
    }))
    .reduce((prev, next) => ({ ...prev, ...next }), {});
}

/**
 * UDFs don't necessarily have a default value, and the value of a DropDown
 * might be undefined according to the RegAPI while Artez presents it as the
 * first available option (on this page anyway).  Try to get the AnswerId
 * reported by the RegAPI, or the first available AnswerId if it was undefined.
 *
 * I think this is only useful for DropDown.
 *
 * eventUDFQuestionKeysToAnswers is the output of
 * `mapEventUDFQuestionKeysToAnswers` given the response from the RegAPI
 * UserDefinedFields method (when passing event ID as the only parameter).
 *
 * udfQuestionKeysToSelectedAnswerIds is the output of
 * `mapUDFQuestionKeysToSelectedAnswerIds` given the response from the RegAPI
 * UserDefinedFields method (when passing registration ID as the only
 * parameter).
 */
function findSelectedAnswerIdOrFirstLegalValueForQuestionKey(
  {
    eventUDFQuestionKeysToAnswers,
    questionKey,
    udfQuestionKeysToSelectedAnswerIds,
  } /* {|
  eventUDFQuestionKeysToAnswers: { [QuestionKey]: Answer },
  questionKey: QuestionKey,
  udfQuestionKeysToSelectedanswerIds: { [QuestionKey]: AnswerId },
|} */
) /* : AnswerId */ {
  const selectedAnswerId = udfQuestionKeysToSelectedAnswerIds[questionKey];

  if (selectedAnswerId === undefined) {
    const legalAnswers = eventUDFQuestionKeysToAnswers[questionKey];

    if (Array.isArray(legalAnswers)) {
      if (legalAnswers.length > 0) {
        if (legalAnswers[0].AnswerID !== undefined) {
          return legalAnswers[0].AnswerID;
        }
      }
    }
  }

  return selectedAnswerId;
}

function makeFindUDFQuestionLabelForCheckboxWithQuestionAndAnswerKey(
  {
    udfAnswerKeysToAnswerIds,
  } /* : { udfAnswerKeysToAnswerIds: AnswerKeysToAnswerIdsMap } */
) {
  /**
   * Checkboxes are special.  For other types, you can find their associated
   * label with `eventUDFQuestionKeysToQuestions[questionKey]`.  For checkboxes
   * you need to use this.
   *
   * `eventUDFQuestionKeysToAnswers` is the output of
   * `mapEventUDFQuestionKeysToAnswers` given the response from the RegAPI
   * UserDefinedFields method (when passing event ID as the only parameter).
   */
  return (
    {
      answerKey,
      eventUDFQuestionKeysToAnswers,
      questionKey,
    } /* : {|
    answerKey: AnswerKey,
    eventUDFQuestionKeysToAnswers: { [QuestionKey]: Answer },
    questionKey: QuestionKey,
  |} */
  ) => {
    const answer = eventUDFQuestionKeysToAnswers[questionKey].find(
      ({ AnswerID }) => String(AnswerID) === udfAnswerKeysToAnswerIds[answerKey]
    );
    return answer === undefined ? undefined : answer.Text;
  };
}

/**
 * Checkboxes are special.  You need to set the default value to checked if
 * Artez has done so.  This is how you find out.  You can pass this as the
 * `defaultChecked` prop to `Checkbox` or `FancyCheckbox`.
 *
 * `udfAnswerKeysToAnswers` is the output of `mapUDFAnswerKeysToAnswers` given
 * the response from the RegAPI UserDefinedFields method (when passing
 * registration ID as the only parameter).
 */
function shouldCheckboxDefaultToChecked(
  {
    answerKey,
    udfAnswerKeysToAnswers,
  } /* : {|
  answerKey: AnswerKey,
  udfAnswerKeysToAnswers: { [AnswerKey]: Answer },
|} */
) {
  return udfAnswerKeysToAnswers[answerKey] !== undefined;
}

function bindWithMap(udfMap /* : UDFMap */) /* : BoundEventUDFs */ {
  const udfAnswerIdsToAnswerKeys /* : AnswerIdsToAnswerKeysMap */ =
    udfMap.answerIdsToAnswerKeys;
  const udfQuestionIdsToAnswerIds /* : QuestionIdsToAnswerIdsMap */ =
    udfMap.questionIdsToAnswerIds;
  const udfQuestionKeysToQuestionIds /* : QuestionKeysToQuestionIdsMap */ =
    udfMap.questionKeysToQuestionIds;

  const udfQuestionKeys /* QuestionKeysMap */ = makeUdfQuestionKeys({
    udfQuestionKeysToQuestionIds,
  });

  const udfAnswerKeys /* AnswerKeysMap */ = makeUdfAnswerKeys({
    udfAnswerIdsToAnswerKeys,
  });

  const udfAnswerKeysToAnswerIds /* : AnswerKeysToAnswerIdsMap */ = makeUdfAnswerKeysToAnswerIds(
    {
      udfAnswerIdsToAnswerKeys,
    }
  );

  const udfQuestionIdsToQuestionKeys /* : QuestionIdsToQuestionKeysMap */ = makeUdfQuestionIdsToQuestionKeys(
    {
      udfQuestionKeysToQuestionIds,
    }
  );

  const udfAnswerIdsToQuestionIds /* : AnswerIdsToQuestionIdsMap */ = makeUdfAnswerIdsToQuestionIds(
    { udfQuestionIdsToAnswerIds }
  );

  const udfAnswerKeysToQuestionKeys /* : AnswerKeysToQuestionKeysMap */ = makeUdfAnswerKeysToQuestionKeys(
    {
      udfQuestionIdsToQuestionKeys,
      udfAnswerKeysToAnswerIds,
      udfAnswerIdsToQuestionIds,
    }
  );

  const findUDFQuestionLabelForCheckboxWithQuestionAndAnswerKey = makeFindUDFQuestionLabelForCheckboxWithQuestionAndAnswerKey(
    {
      udfAnswerKeysToAnswerIds,
    }
  );

  /**
   * Create an object with UDF question keys as keys and sub question text as
   * values.  Only useful for UDF types that have more than one associated
   * AnswerID (like DropDown).
   */
  const mapEventUDFQuestionKeysToAnswers = (eventUDFs /* : EventUDFs */) =>
    eventUDFs
      .map(({ QuestionID, Answers }) => ({
        [udfQuestionIdsToQuestionKeys[QuestionID]]: Answers,
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {});

  /**
   * Create an object with UDF question keys as keys and actual question text
   * as values.
   */
  const mapEventUDFQuestionKeysToQuestions = (eventUDFs /* : EventUDFs */) =>
    eventUDFs
      .map(({ QuestionID, Text }) => ({
        [udfQuestionIdsToQuestionKeys[QuestionID]]: Text,
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {});

  /**
   * Create an object with UDF answer keys as keys and the registrant's
   * responses as values.
   */
  const mapUDFAnswerKeysToAnswers = (registrantUDFs /* : RegistrantUDFs */) =>
    registrantUDFs.reduce(
      (prev, { AnswerId, Answer }) => ({
        ...prev,
        [udfAnswerIdsToAnswerKeys[String(AnswerId)]]: Answer,
      }),
      {}
    );

  /**
   * Create an object with UDF question keys and responses as values.  More
   * useful for UDFs that can only have one value (then the answer will be the
   * actual value that the registrant entered), otherwise for UDFs that can
   * have multiple types it will be the description of the selection.  For
   * example, a `Text`'s answer will be an actual string entered by a user, a
   * `DropDown`'s answer will be a string entered by the Artez event
   * administrator.
   */
  const mapUDFQuestionKeysToAnswers = (registrantUDFs /* : RegistrantUDFs */) =>
    registrantUDFs
      .map(({ AnswerId, Answer }) => ({
        [udfQuestionIdsToQuestionKeys[
          udfAnswerIdsToQuestionIds[AnswerId]
        ]]: Answer,
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {});

  /**
   * An object with UDF question keys and chosen answer ids as values.  This
   * is more useful for UDFs that can have multiple values, for example with
   * this and the udfQuestionKeysToQuestionIds object you can easily find the
   * currently selected value of a DropDown.
   */
  const mapUDFQuestionKeysToSelectedAnswerIds = (
    registrantUDFs /* : RegistrantUDFs */
  ) =>
    registrantUDFs
      .map(({ AnswerId }) => ({
        [udfQuestionIdsToQuestionKeys[
          udfAnswerIdsToQuestionIds[AnswerId]
        ]]: AnswerId,
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {});

  return {
    findSelectedAnswerIdOrFirstLegalValueForQuestionKey,
    findUDFQuestionLabelForCheckboxWithQuestionAndAnswerKey,
    mapEventUDFQuestionKeysToAnswers,
    mapEventUDFQuestionKeysToQuestions,
    mapUDFAnswerKeysToAnswers,
    mapUDFQuestionKeysToAnswers,
    mapUDFQuestionKeysToSelectedAnswerIds,
    shouldCheckboxDefaultToChecked,
    udfAnswerIdsToAnswerKeys,
    udfAnswerIdsToQuestionIds,
    udfAnswerKeys,
    udfAnswerKeysToAnswerIds,
    udfAnswerKeysToQuestionKeys,
    udfQuestionIdsToAnswerIds,
    udfQuestionIdsToQuestionKeys,
    udfQuestionKeys,
    udfQuestionKeysToQuestionIds,
  };
}

function makeBoundEventUDFsObject(
  {
    eventId,
    mappedUDFs,
  } /* : {| eventId: EventId, mappedUDFs: MultiUDFMap |} */
) /* BoundEventUDFs: */ {
  return bindWithMap(mappedUDFs[eventId]);
}

class UDFMapper {
  /*::
    _boundEventUDFs: BoundEventUDFs;
    _dirty: boolean;
    _eventId: EventId | null;
    _mappedUDFs: MultiUDFMap | null;
   */

  constructor() {
    this._eventId = null;
    this._mappedUDFs = null;
  }

  getBoundEventUDFs(
    eventId /* : EventId */,
    mappedUDFs /* : MultiUDFMap */
  ) /* : BoundEventUDFs */ {
    if (this._eventId !== eventId) {
      this._eventId = eventId;
      this._mappedUDFs = mappedUDFs;
      this._boundEventUDFs = makeBoundEventUDFsObject({
        eventId: this._eventId,
        mappedUDFs: this._mappedUDFs,
      });
    }

    return this._boundEventUDFs;
  }
}

/**
 * This is a function to help merge the UDF responses that you get from the
 * RegAPI with new UDF responses that are being prepared for submission (for
 * example, on the second page of a signup form for post-signup UDF
 * submissions).
 */
function mergeUDFResponses(
  {
    boundEventUDFs,
    existingUDFResponses,
    newUDFResponses,
  } /* : {|
  boundEventUDFs: BoundEventUDFs,
  existingUDFResponses: RegistrantUDFs | UDFResponses,
  newUDFResponses: RegistrantUDFs | UDFResponses,
|} */
) /* : UDFResponses */ {
  const {
    udfAnswerIdsToQuestionIds,
    udfQuestionIdsToAnswerIds,
  } = boundEventUDFs;

  const nextAnswerIds = newUDFResponses.map(response =>
    String(caseless(response).get('AnswerID'))
  );

  return (result =>
    keys(result).map(key => ({
      AnswerID: parseInt(key, 10),
      Value: result[key],
    })))(
    [
      ...existingUDFResponses
        .filter(response => {
          const AnswerID = String(caseless(response).get('AnswerID'));
          // Artez shits the bed if you give more than than one answer to a UDF
          // like a dropdown or something. If the new responses we want to merge
          // in have an answer ID that belongs to this question ID, filter out
          // the existing answer ID.
          if (
            udfQuestionIdsToAnswerIds[udfAnswerIdsToQuestionIds[AnswerID]] &&
            udfQuestionIdsToAnswerIds[udfAnswerIdsToQuestionIds[AnswerID]]
              .length > 1
          ) {
            if (
              udfQuestionIdsToAnswerIds[
                udfAnswerIdsToQuestionIds[AnswerID]
              ].some(element => nextAnswerIds.includes(element))
            ) {
              return false;
            }
          }

          return true;
        })
        .map(response => {
          const caselessResponse = caseless(response);
          return {
            [caselessResponse.get('AnswerID')]:
              caselessResponse.get('Answer') === undefined
                ? caselessResponse.get('Value')
                : caselessResponse.get('Answer'),
          };
        }),

      ...newUDFResponses.map(response => {
        const caselessResponse = caseless(response);
        return {
          [caselessResponse.get('AnswerID')]: caselessResponse.get('Value'),
        };
      }),
    ].reduce((prev, next) => ({ ...prev, ...next }), {})
  );
}

module.exports = {
  UDFMapper,
  mapEventUDFs,
  mergeUDFResponses,
};
