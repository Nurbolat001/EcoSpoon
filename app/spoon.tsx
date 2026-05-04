import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../src/components/Button';
import Card from '../src/components/Card';
import Screen from '../src/components/Screen';
import ScreenHeader from '../src/components/ScreenHeader';
import { spoonAlternatives } from '../src/data/ecoContent';
import { colors, commonStyles, radius, spacing } from '../src/styles/commonStyles';

export default function SpoonScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Шешім"
        icon="leaf-outline"
        subtitle="Мектепке алып жүруге шынымен ыңғайлы нұсқаны таңда."
        title="Пластик қасықты немен алмастыруға болады?"
      />

      <Card style={styles.heroCard} variant="mint">
        <View style={styles.heroIcon}>
          <Ionicons color={colors.mintStrong} name="bag-check-outline" size={34} />
        </View>
        <Text style={styles.heroTitle}>Ереже қарапайым: алдың, жудың, қайта қолдандың</Text>
        <Text style={commonStyles.body}>
          Зат неғұрлым ұзақ қызмет етсе, тіскебасардан кейінгі қоқыс соғұрлым аз болады.
        </Text>
      </Card>

      {spoonAlternatives.map((alternative) => (
        <Card key={alternative.title} style={styles.altCard} variant={alternative.variant}>
          <View style={styles.altIcon}>
            <Ionicons color={colors.teal} name={alternative.icon} size={24} />
          </View>
          <View style={styles.altText}>
            <Text style={styles.altTitle}>{alternative.title}</Text>
            <Text style={commonStyles.body}>{alternative.text}</Text>
          </View>
        </Card>
      ))}

      <Button
        icon="restaurant-outline"
        onPress={() => router.push('/recipe')}
        title="Жеуге болатын қасық рецепті"
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
  altCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  altIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  altText: {
    flex: 1,
  },
  altTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
});
