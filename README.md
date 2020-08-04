# `udf-mapper`

Map UDFs for Artez Events.

The goal is to make maps of relationships between UDF question/answer keys
(strings that we can read and understand) and question/answer ids (what Artez
expects).
 
By default the keys it returns will be the strings entered by the client.  You
probably want to change these to something more descriptive and beware that
there's no guarantee that this will return the complete list of UDFs (for
example, the names entered by the client might not be unique, and that can't be
properly represented by a map).

```
|-------------------------------------------------------------------|
|                                                                   |
|                                   answerIdsToAnswerKeys           |
|                                                                   |
|                                             |                     |
|     questionKeysToQuestionIds               |                     |
|                                                                   |
|               |            /---> Q1_A1_ID <---> Q1_A2_NAME        |
|               |           /                                       |
|                         </                                        |
|     Q1_NAME <---> Q1_ID                                           |
|                         <\                                        |
|                           \                                       |
|                            \---> Q1_A2_ID <---> Q1_A2_NAME        |
|                                                                   |
|                                                                   |
|     Q2_NAME <---> Q2_ID <------> Q2_A1_ID <---> Q2_A1_NAME        |
|                                                                   |
|                            |                                      |
|                            |                                      |
|                                                                   |
|                  questionIdsToAnswerIds                           |
|                                                                   |
|-------------------------------------------------------------------|

```

## Installation

```
$ npm install -g "git+ssh://git@github.com/mango-chutney/udf-mapper.git#master"
$ # --- or ---
$ yarn global add "git+ssh://git@github.com/mango-chutney/udf-mapper.git#master"
```

## Usage

```
$ udf-mapper --org-id mango --api-key topsecretapikey123 --event-ids 48595 46505
```
