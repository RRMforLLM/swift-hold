import { useThemeColor } from '@/hooks/useThemeColor';
import { Pressable, PressableProps } from 'react-native';

export interface ThemedPressableProps extends PressableProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedPressable(props: ThemedPressableProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <Pressable 
    style={(state) => {
      const baseStyle = [{ backgroundColor } as const];
      const pressedStyle = state.pressed ? { opacity: 0.8 } as const : {};
      if (typeof style === 'function') {
        return [baseStyle, pressedStyle, style(state)];
      }
      return [baseStyle, pressedStyle, style];
    }} 
    {...otherProps} 
  />;
}
