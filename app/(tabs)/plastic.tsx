import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Screen from '../../src/components/Screen';
import ScreenHeader from '../../src/components/ScreenHeader';
import { plasticFacts } from '../../src/data/ecoContent';
import { colors, commonStyles, radius, spacing } from '../../src/styles/commonStyles';

export default function PlasticScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Мәселе"
        icon="warning-outline"
        subtitle="Бір реттік қасық ұсақ нәрсе сияқты көрінеді, бірақ мұндай ұсақ заттар күн сайын көбейеді."
        title="Пластик неге қауіпті?"
      />

      <Card style={styles.heroCard} variant="coral">
        <View style={styles.heroIcon}>
          <Ionicons color={colors.coralStrong} name="earth" size={34} />
        </View>
        <Text style={styles.heroTitle}>Бір реттік зат азайса, айнала тазарады</Text>
        <Text style={commonStyles.body}>
          Жақсы экоәдет күрделі болмауы керек. Бірнеше рет қолдануға болатын бір заттан баста.
        </Text>
      </Card>

      {plasticFacts.map((fact) => (
        <Card key={fact.title} style={styles.factCard} variant={fact.variant}>
          <View style={styles.factIcon}>
            <Ionicons color={colors.teal} name={fact.icon} size={24} />
          </View>
          <View style={styles.factText}>
            <Text style={styles.factTitle}>{fact.title}</Text>
            <Text style={commonStyles.body}>{fact.text}</Text>
          </View>
        </Card>
      ))}

      <Button
        icon="leaf-outline"
        onPress={() => router.push('/spoon')}
        title="Қасыққа балама көру"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    alignItems: 'center',
    gap: spacing.md,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  factText: {
    flex: 1,
  },
  factTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
});
