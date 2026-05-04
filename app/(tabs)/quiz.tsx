import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Screen from '../../src/components/Screen';
import ScreenHeader from '../../src/components/ScreenHeader';
import { colors, commonStyles, radius, spacing } from '../../src/styles/commonStyles';
import { createRandomQuiz, QUESTION_COUNT } from '../../src/utils/quiz';

export default function QuizScreen() {
  const [questions, setQuestions] = useState(() => createRandomQuiz());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / QUESTION_COUNT) * 100),
    [currentIndex],
  );

  const answerQuestion = useCallback(
    (answer: string) => {
      if (isAnswered) {
        return;
      }

      setSelectedAnswer(answer);
      if (answer === currentQuestion.correctAnswer) {
        setScore((previousScore) => previousScore + 1);
      }
    },
    [currentQuestion.correctAnswer, isAnswered],
  );

  const goNext = useCallback(() => {
    if (!isAnswered) {
      return;
    }

    if (currentIndex === QUESTION_COUNT - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  }, [currentIndex, isAnswered]);

  const restartQuiz = useCallback(() => {
    setQuestions(createRandomQuiz());
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  }, []);

  if (isFinished) {
    return (
      <Screen centered>
        <Card style={styles.finishCard} variant="mint">
          <View style={styles.finishIcon}>
            <Ionicons color={colors.amberStrong} name="trophy" size={42} />
          </View>
          <Text style={styles.finishTitle}>Нәтиже</Text>
          <Text style={styles.scoreText}>
            Сен {QUESTION_COUNT} сұрақтың {score} сұрағына дұрыс жауап бердің.
          </Text>
          <Text style={commonStyles.body}>
            Жаңа сынақ сұрақтар мен жауаптарды араластырады, сондықтан тағы жаттығуға болады.
          </Text>
        </Card>
        <Button icon="refresh-outline" onPress={restartQuiz} title="Жаңа сынақты бастау" />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Қысқа сынақ"
        icon="school-outline"
        subtitle="Жауапты таңда. Таңдағаннан кейін қосымша дұрыс жауапты бірден көрсетеді."
        title={`${currentIndex + 1}/${QUESTION_COUNT} сұрақ`}
      />

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` as `${number}%` }]} />
      </View>

      <Card style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </Card>

      <View style={styles.options}>
        {currentQuestion.options.map((option) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;
          const showCorrect = isAnswered && isCorrect;
          const showWrong = isAnswered && isSelected && !isCorrect;

          return (
            <Pressable
              accessibilityRole="button"
              disabled={isAnswered}
              key={option}
              onPress={() => answerQuestion(option)}
              style={({ pressed }) => [
                styles.option,
                pressed && !isAnswered ? styles.optionPressed : null,
                showCorrect ? styles.correctOption : null,
                showWrong ? styles.wrongOption : null,
              ]}>
              <Text
                style={[
                  styles.optionText,
                  showCorrect ? styles.correctText : null,
                  showWrong ? styles.wrongText : null,
                ]}>
                {option}
              </Text>
              {showCorrect ? (
                <Ionicons color={colors.mintStrong} name="checkmark-circle" size={24} />
              ) : null}
              {showWrong ? <Ionicons color={colors.danger} name="close-circle" size={24} /> : null}
            </Pressable>
          );
        })}
      </View>

      <Button
        disabled={!isAnswered}
        icon={currentIndex === QUESTION_COUNT - 1 ? 'flag-outline' : 'arrow-forward-outline'}
        onPress={goNext}
        title={currentIndex === QUESTION_COUNT - 1 ? 'Нәтижені көрсету' : 'Келесі сұрақ'}
        variant={isAnswered ? 'primary' : 'ghost'}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressTrack: {
    height: 10,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.mintStrong,
  },
  questionCard: {
    paddingVertical: spacing.xl,
  },
  questionText: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 29,
    textAlign: 'center',
  },
  options: {
    gap: spacing.md,
  },
  option: {
    minHeight: 62,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.card,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  optionPressed: {
    transform: [{ scale: 0.98 }],
    borderColor: colors.teal,
  },
  correctOption: {
    borderColor: colors.mintStrong,
    backgroundColor: colors.mint,
  },
  wrongOption: {
    borderColor: colors.danger,
    backgroundColor: '#FFF1F1',
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    flex: 1,
  },
  correctText: {
    color: colors.mintStrong,
  },
  wrongText: {
    color: colors.danger,
  },
  finishCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  finishIcon: {
    width: 80,
    height: 80,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  finishTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  scoreText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
    textAlign: 'center',
  },
});
