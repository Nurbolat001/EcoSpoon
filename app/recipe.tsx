import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../src/components/Button';
import Card from '../src/components/Card';
import EmptyState from '../src/components/EmptyState';
import ProgressBar from '../src/components/ProgressBar';
import Screen from '../src/components/Screen';
import ScreenHeader from '../src/components/ScreenHeader';
import { recipes, type Recipe } from '../src/data/ecoContent';
import { colors, commonStyles, radius, spacing } from '../src/styles/commonStyles';

type RecipeCardProps = {
  recipe: Recipe;
  selected: boolean;
  onSelect: (id: string) => void;
};

const RecipeCard = memo(function RecipeCard({ recipe, selected, onSelect }: RecipeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onSelect(recipe.id)}
      style={({ pressed }) => [
        styles.recipeCard,
        selected ? styles.recipeCardSelected : null,
        pressed ? styles.pressed : null,
      ]}>
      <View style={[styles.recipeIcon, selected ? styles.recipeIconSelected : null]}>
        <Ionicons color={selected ? colors.white : colors.teal} name={recipe.icon} size={24} />
      </View>
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Text style={styles.recipeDescription}>{recipe.description}</Text>
        <View style={styles.recipeMeta}>
          <Text style={styles.metaText}>{recipe.timeMinutes} мин</Text>
          <Text style={styles.metaText}>{recipe.difficulty}</Text>
        </View>
      </View>
      {selected ? <Ionicons color={colors.mintStrong} name="checkmark-circle" size={25} /> : null}
    </Pressable>
  );
});

type CookingStepProps = {
  done: boolean;
  index: number;
  text: string;
  onToggle: (index: number) => void;
};

const CookingStep = memo(function CookingStep({ done, index, text, onToggle }: CookingStepProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      onPress={() => onToggle(index)}
      style={({ pressed }) => [
        styles.stepRow,
        done ? styles.stepRowDone : null,
        pressed ? styles.pressed : null,
      ]}>
      <View style={[styles.checkbox, done ? styles.checkboxDone : null]}>
        {done ? <Ionicons color={colors.white} name="checkmark" size={18} /> : null}
      </View>
      <View style={styles.stepTextWrap}>
        <Text style={styles.stepLabel}>{index + 1}-қадам</Text>
        <Text style={[styles.stepText, done ? styles.stepTextDone : null]}>{text}</Text>
      </View>
    </Pressable>
  );
});

export default function RecipeScreen() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0]?.id ?? '');
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});
  const [isCooking, setIsCooking] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const selectedRecipe = useMemo(
    () => recipes.find((recipe) => recipe.id === selectedRecipeId) ?? recipes[0],
    [selectedRecipeId],
  );

  const selectedCompletedSteps = selectedRecipe ? completedSteps[selectedRecipe.id] ?? [] : [];
  const progress = selectedRecipe
    ? Math.round((selectedCompletedSteps.length / selectedRecipe.steps.length) * 100)
    : 0;

  const selectRecipe = useCallback((id: string) => {
    setSelectedRecipeId(id);
    setIsCooking(false);
  }, []);

  const startCooking = useCallback(() => {
    setIsStarting(true);
    setTimeout(() => {
      setIsCooking(true);
      setIsStarting(false);
    }, 250);
  }, []);

  const toggleStep = useCallback(
    (stepIndex: number) => {
      if (!selectedRecipe) {
        return;
      }

      setCompletedSteps((current) => {
        const recipeSteps = current[selectedRecipe.id] ?? [];
        const nextSteps = recipeSteps.includes(stepIndex)
          ? recipeSteps.filter((item) => item !== stepIndex)
          : [...recipeSteps, stepIndex];

        return {
          ...current,
          [selectedRecipe.id]: nextSteps,
        };
      });
    },
    [selectedRecipe],
  );

  const resetCurrentRecipe = useCallback(() => {
    if (!selectedRecipe) {
      return;
    }

    setCompletedSteps((current) => ({
      ...current,
      [selectedRecipe.id]: [],
    }));
  }, [selectedRecipe]);

  if (!selectedRecipe) {
    return (
      <Screen>
        <ScreenHeader
          eyebrow="Рецепттер"
          icon="restaurant-outline"
          title="Экоас әзірлейік"
        />
        <EmptyState
          icon="book-outline"
          title="Рецепт әлі жоқ"
          text="Мұнда мектеп жобасына арналған қауіпсіз әрі қарапайым рецепттер пайда болады."
        />
        <Button icon="close-outline" onPress={() => router.back()} title="Жабу" variant="secondary" />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.modalHeader}>
        <View style={styles.flex}>
          <ScreenHeader
            eyebrow="Рецепттер"
            icon="restaurant-outline"
            subtitle="Бір рецептті таңда да, қадамдарды орындап көр. Пеш немесе пышақ керек болса, ересек адамнан көмек сұра."
            title="Экоас әзірлейік"
          />
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons color={colors.text} name="close" size={24} />
        </Pressable>
      </View>

      <View style={styles.contentBlock}>
        <Text style={commonStyles.sectionTitle}>Рецепт таңда</Text>
        <View style={styles.recipeList}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              onSelect={selectRecipe}
              recipe={recipe}
              selected={recipe.id === selectedRecipe.id}
            />
          ))}
        </View>
      </View>

      <Card style={styles.detailCard} variant="amber">
        <View style={styles.detailHeader}>
          <View style={styles.detailIcon}>
            <Ionicons color={colors.amberStrong} name={selectedRecipe.icon} size={27} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.detailTitle}>{selectedRecipe.title}</Text>
            <Text style={commonStyles.body}>{selectedRecipe.description}</Text>
          </View>
        </View>

        <View style={styles.chips}>
          {selectedRecipe.ingredients.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      </Card>

      {isCooking ? (
        <Card style={styles.cookingCard}>
          <View style={styles.cardTitleRow}>
            <View>
              <Text style={styles.cardTitle}>Өзің жасап көр</Text>
              <Text style={styles.progressText}>{progress}% дайын</Text>
            </View>
            <Ionicons
              color={progress === 100 ? colors.amberStrong : colors.mintStrong}
              name={progress === 100 ? 'trophy' : 'timer-outline'}
              size={28}
            />
          </View>

          <ProgressBar value={progress} />

          <View style={styles.steps}>
            {selectedRecipe.steps.map((step, index) => (
              <CookingStep
                done={selectedCompletedSteps.includes(index)}
                index={index}
                key={`${selectedRecipe.id}-${step}`}
                onToggle={toggleStep}
                text={step}
              />
            ))}
          </View>

          <Card style={styles.safetyCard} variant="coral">
            <Ionicons color={colors.coralStrong} name="shield-checkmark-outline" size={24} />
            <Text style={styles.safetyText}>{selectedRecipe.safetyNote}</Text>
          </Card>
        </Card>
      ) : null}

      <View style={styles.actions}>
        <Button
          icon={isCooking ? 'refresh-outline' : 'play-outline'}
          loading={isStarting}
          onPress={isCooking ? resetCurrentRecipe : startCooking}
          title={isCooking ? 'Қадамдарды қайта бастау' : 'Өзім жасап көремін'}
        />
        <Button
          icon="stats-chart-outline"
          onPress={() => router.push('/calculator')}
          title="Пайдасын есептеу"
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  contentBlock: {
    gap: spacing.md,
  },
  recipeList: {
    gap: spacing.md,
  },
  recipeCard: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.sheet,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  recipeCardSelected: {
    borderColor: '#BFEBD0',
    backgroundColor: colors.mint,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  recipeIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  recipeIconSelected: {
    backgroundColor: colors.mintStrong,
  },
  recipeContent: {
    flex: 1,
    gap: spacing.xs,
  },
  recipeTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  recipeDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  recipeMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '900',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  detailCard: {
    gap: spacing.lg,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  detailIcon: {
    width: 54,
    height: 54,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  detailTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    minHeight: 40,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  cookingCard: {
    gap: spacing.lg,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  progressText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  steps: {
    gap: spacing.sm,
  },
  stepRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  stepRowDone: {
    borderColor: '#BFEBD0',
    backgroundColor: colors.surfaceAlt,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  checkboxDone: {
    borderColor: colors.mintStrong,
    backgroundColor: colors.mintStrong,
  },
  stepTextWrap: {
    flex: 1,
  },
  stepLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  stepText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  stepTextDone: {
    color: colors.muted,
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    elevation: 0,
  },
  safetyText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  actions: {
    gap: spacing.md,
  },
});
