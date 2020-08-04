/*::
export type EventId = string;

export type Answer = string;

export type AnswerId = string;

export type AnswerKey = string;

export type Question = string;

export type QuestionId = string;

export type QuestionKey = string;

export type QuestionKeysMap = { [QuestionKey]: QuestionKey };

export type AnswerKeysMap = { [AnswerKey]: AnswerKey };

export type AnswerKeysToAnswerIdsMap = { [AnswerKey]: AnswerId };

export type AnswerIdsToAnswerKeysMap = { [AnswerId]: AnswerKey };

export type QuestionIdsToAnswerIdsMap = { [QuestionId]: AnswerId };

export type QuestionKeysToQuestionIdsMap = { [QuestionKey]: QuestionId };

export type QuestionIdsToQuestionKeysMap = { [QuestionId]: QuestionKey };

export type AnswerIdsToQuestionIdsMap = { [AnswerId]: QuestionId };

export type AnswerKeysToQuestionKeysMap = { [AnswerKey]: QuestionKey };

export type UDFMap = {
  answerIdsToAnswerKeys: AnswerIdsToAnswerKeysMap,
  questionIdsToAnswerIds: QuestionIdsToAnswerIdsMap,
  questionKeysToQuestionIds: QuestionKeysToQuestionIdsMap,
};

export type MultiUDFMap = { [EventId]: UDFMap };

export type EventUDF = {|
  QuestionID: number,
  Type: string,
  Text: string,
  Forms: any,
  Answers: Array<{|
    AnswerID: number,
    Text: string,
  |}>,
|};

// Describes the output of the RegAPI's UDF endpoint when called like
// /api/UserDefinedFields?EventID=1234
export type EventUDFs = Array<EventUDF>;

// Describes the output of the RegAPI's UDF endpoint when called like
// /api/UserDefinedFields?RegistrationID=1234
// Beware of the weird casing of `AnswerId`, that's not a typo.
export type RegistrantUDFs = Array<{|
  Question: string,
  AnswerId: number,
  Answer: string,
|}>;

// This is the schema that the RegAPI expects when using the `putUDFs` or
// `postRegistrations` methods.
// Beware of the casing of `AnswerID`, that's not a typo.
export type UDFResponses = Array<{|
  AnswerID: number,
  Value: string,
|}>;

export type BoundEventUDFs = {|
  udfAnswerIdsToAnswerKeys: AnswerIdsToAnswerKeysMap,
  udfQuestionIdsToAnswerIds: QuestionIdsToAnswerIdsMap,
  udfQuestionKeysToQuestionIds: QuestionKeysToQuestionIdsMap,
  udfQuestionKeys: QuestionKeysMap,
  udfAnswerKeys: AnswerKeysMap,
  udfAnswerKeysToAnswerIds: AnswerKeysToAnswerIdsMap,
  udfQuestionIdsToQuestionKeys: QuestionIdsToQuestionKeysMap,
  udfAnswerIdsToQuestionIds: AnswerIdsToQuestionIdsMap,
  udfAnswerKeysToQuestionKeys: AnswerKeysToQuestionKeysMap,
  mapEventUDFQuestionKeysToAnswers: (
    eventUDFs: EventUDFs,
  ) => { [QuestionKey]: Answer },
  mapEventUDFQuestionKeysToQuestions: (
    eventUDFs: EventUDFs,
  ) => { [QuestionKey]: Question },
  mapUDFAnswerKeysToAnswers: (
    registrantUDFs: RegistrantUDFs,
  ) => { [AnswerKey]: Answer },
  mapUDFQuestionKeysToAnswers: (
    registrantUDFs: RegistrantUDFs,
  ) => { [QuestionKey]: Answer },
  mapUDFQuestionKeysToSelectedAnswerIds: (
    registrantUDFs: RegistrantUDFs,
  ) => { [QuestionKey]: AnswerId },
|};
*/
