import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Animated, View } from 'react-native';
import { customTheme } from '../utils/theme';

export const FadeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            return () => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            };
        }, [fadeAnim])
    );

    return (
        <View style={{ backgroundColor: customTheme.colors.background, flex: 1 }}>
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                {children}
            </Animated.View>
        </View>
    );
};
