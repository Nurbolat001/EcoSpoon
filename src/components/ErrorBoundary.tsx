import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, commonStyles, spacing } from '../styles/commonStyles';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <View style={[commonStyles.screen, styles.container]}>
          <Text style={commonStyles.title}>Бірдеңе дұрыс болмады</Text>
          <Text style={[commonStyles.body, styles.message]}>
            Қосымшаны қайта іске қос. Қате қайталанса, осы хабарламаны мұғалімге көрсет.
          </Text>
          {__DEV__ && this.state.error ? (
            <Text style={styles.errorText}>{this.state.error.message}</Text>
          ) : null}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  message: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});

export default ErrorBoundary;
