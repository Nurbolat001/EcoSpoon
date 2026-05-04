import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Screen from '../../src/components/Screen';
import { dailyHabits } from '../../src/data/ecoContent';
import { colors, commonStyles, radius, spacing } from '../../src/styles/commonStyles';

export default function HomeScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Screen>
      <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.hero}>
          <View style={styles.logoBubble}>
            <Ionicons color={colors.white} name="leaf" size={30} />
          </View>
          <Text style={commonStyles.eyebrow}>EcoSpoon</Text>
          <Text style={commonStyles.title}>Жалықтырмайтын экоәдеттер</Text>
          <Text style={commonStyles.subtitle}>
            Мектеп жобасына арналған қарапайым қосымша: пластик азайып, пайдалы әрекет көбейеді.
          </Text>
        </View>

        <Card style={styles.missionCard} variant="mint">
          <View style={styles.missionTop}>
            <View style={styles.missionIcon}>
              <Ionicons color={colors.amberStrong} name="sparkles" size={24} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Бүгінгі мақсат</Text>
              <Text style={commonStyles.body}>Бір рет тамақтанғанда бір реттік пластик қасық қолданбау.</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>күн қатарынан</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>21</Text>
              <Text style={styles.statLabel}>қасық аз</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>+1</Text>
              <Text style={styles.statLabel}>дұрыс таңдау</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.habitsCard}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>Эко-тізім</Text>
            <Text style={styles.cardBadge}>2/3</Text>
          </View>
          {dailyHabits.map((habit) => (
            <View key={habit.title} style={styles.habitRow}>
              <View style={styles.habitLeft}>
                <View style={styles.habitIcon}>
                  <Ionicons color={colors.teal} name={habit.icon} size={22} />
                </View>
                <Text style={styles.habitText}>{habit.title}</Text>
              </View>
              <Ionicons
                color={habit.done ? colors.mintStrong : colors.softText}
                name={habit.done ? 'checkmark-circle' : 'ellipse-outline'}
                size={25}
              />
            </View>
          ))}
        </Card>

        <Card style={styles.factCard} variant="sky">
          <View style={styles.factIcon}>
            <Ionicons color={colors.skyStrong} name="school-outline" size={28} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>Жобаны қорғауға факт</Text>
            <Text style={commonStyles.body}>
              Егер 25 оқушы бір рет қана бір реттік қасық алмаса, қоқыс 25 затқа азаяды.
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button icon="warning-outline" onPress={() => router.push('/plastic')} title="Пластик туралы білу" />
          <Button
            icon="school-outline"
            onPress={() => router.push('/quiz')}
            title="Қысқа сынақтан өту"
            variant="secondary"
          />
        </View>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  flex: {
    flex: 1,
  },
  hero: {
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  logoBubble: {
    width: 64,
    height: 64,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.mintStrong,
  },
  missionCard: {
    gap: spacing.lg,
  },
  missionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  missionIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  progressTrack: {
    height: 12,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  progressFill: {
    width: '68%',
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.mintStrong,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statItem: {
    flex: 1,
    minHeight: 72,
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: radius.card,
    backgroundColor: 'rgba(255,255,255,0.68)',
  },
  statNumber: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  habitsCard: {
    gap: spacing.md,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 24,
  },
  cardBadge: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '900',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  habitRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  habitLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  habitIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  habitText: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  factCard: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  factIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  actions: {
    gap: spacing.md,
  },
});
