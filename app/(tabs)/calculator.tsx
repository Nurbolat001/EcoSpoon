import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Screen from '../../src/components/Screen';
import ScreenHeader from '../../src/components/ScreenHeader';
import { colors, commonStyles, radius, spacing } from '../../src/styles/commonStyles';

const parseSpoonCount = (value: string) => {
  const parsed = Number(value.replace(',', '.'));

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Math.min(parsed, 99);
};

export default function CalculatorScreen() {
  const [spoonsPerDay, setSpoonsPerDay] = useState('');

  const stats = useMemo(() => {
    const daily = parseSpoonCount(spoonsPerDay);

    return {
      daily,
      weekly: Math.round(daily * 7),
      monthly: Math.round(daily * 30),
      yearly: Math.round(daily * 365),
    };
  }, [spoonsPerDay]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={commonStyles.flex}>
      <Screen keyboardShouldPersistTaps="handled">
        <ScreenHeader
          eyebrow="Есеп"
          icon="stats-chart-outline"
          subtitle="Бір күнде қанша бір реттік қасық қолданбайтыныңды енгіз."
          title="Қанша пластик үнемдеуге болады?"
        />

        <Card style={styles.inputCard}>
          <View style={styles.inputIcon}>
            <Ionicons color={colors.teal} name="create-outline" size={27} />
          </View>
          <Text style={styles.label}>Күніне қасық саны</Text>
          <TextInput
            accessibilityLabel="Күніне қолданылмайтын пластик қасық саны"
            inputMode="decimal"
            keyboardType="decimal-pad"
            maxLength={4}
            onChangeText={setSpoonsPerDay}
            placeholder="Мысалы: 3"
            placeholderTextColor={colors.softText}
            style={styles.input}
            value={spoonsPerDay}
          />
          <Text style={styles.hint}>Формула қарапайым: күндік сан x 365.</Text>
        </Card>

        <Card style={styles.resultCard} variant="mint">
          <Text style={styles.resultLabel}>Бір жылда</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.resultNumber}>
            {stats.yearly}
          </Text>
          <Text style={styles.resultText}>бір реттік қасық қоқысқа түспейді</Text>
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard} variant="sky">
            <Text style={styles.statNumber}>{stats.weekly}</Text>
            <Text style={styles.statLabel}>бір аптада</Text>
          </Card>
          <Card style={styles.statCard} variant="amber">
            <Text style={styles.statNumber}>{stats.monthly}</Text>
            <Text style={styles.statLabel}>бір айда</Text>
          </Card>
        </View>

        <Button
          icon="school-outline"
          onPress={() => router.push('/quiz')}
          title="Біліміңді тексеру"
          variant="secondary"
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputCard: {
    gap: spacing.md,
  },
  inputIcon: {
    width: 54,
    height: 54,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  label: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  input: {
    minHeight: 60,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FBFFFC',
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  hint: {
    color: colors.softText,
    fontSize: 14,
    fontWeight: '700',
  },
  resultCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xs,
  },
  resultLabel: {
    color: colors.teal,
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultNumber: {
    width: '100%',
    color: colors.mintStrong,
    fontSize: 58,
    fontWeight: '900',
    lineHeight: 66,
    textAlign: 'center',
  },
  resultText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statNumber: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
});
