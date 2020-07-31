// @flow

import type { AnswerId, QuestionKey } from 'udf-mapper';

export default ({
  answerId,
  eventUDFQuestionKeysToAnswers,
  questionKey,
}: {
  answerId: AnswerId,
  eventUDFQuestionKeysToAnswers: { [QuestionKey]: AnswerId },
  questionKey: QuestionKey,
}) => {
  const answers = eventUDFQuestionKeysToAnswers[questionKey];
  try {
    return answers.find(answer => String(answer.AnswerID) === String(answerId))
      .Text;
  } catch (error) {
    return undefined;
  }
};
