import { questionBank, type Question } from '../data/ecoContent';

export const QUESTION_COUNT = 5;

const shuffle = <T,>(items: T[]) => {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
};

export const createRandomQuiz = (count = QUESTION_COUNT): Question[] =>
  shuffle(questionBank)
    .slice(0, count)
    .map((question) => ({
      ...question,
      options: shuffle(question.options),
    }));
