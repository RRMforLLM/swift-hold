import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export interface ThemedInputProps extends TextInputProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedInput(props: ThemedInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#666' }, 'text');
  const textColor = useThemeColor({}, 'text');

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor,
          borderColor,
          color: textColor,
        },
        style,
      ]}
      placeholderTextColor={useThemeColor({}, 'text') + '80'} // Adding 80 for 50% opacity
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
