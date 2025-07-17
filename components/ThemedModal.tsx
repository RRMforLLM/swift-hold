import { useThemeColor } from '@/hooks/useThemeColor';
import { Modal, ModalProps, StyleSheet, View, ViewStyle } from 'react-native';

export interface ThemedModalProps extends ModalProps {
  lightColor?: string;
  darkColor?: string;
  contentStyle?: ViewStyle;
}

export function ThemedModal(props: ThemedModalProps) {
  const { style, lightColor, darkColor, children, contentStyle, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <Modal transparent {...otherProps}>
      <View style={[styles.container, style]}>
        <View style={[styles.content, { backgroundColor }, contentStyle]}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    borderRadius: 16,
    padding: 20,
    width: '80%',
    gap: 16,
  },
});
