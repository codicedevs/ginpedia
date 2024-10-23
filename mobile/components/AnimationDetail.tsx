import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-magnus';
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scale, verticalScale } from 'react-native-size-matters';

type AnimationProps = {
    onAnimationComplete: () => void;
}

function AnimationDetail() {
    const [animationPhase, setAnimationPhase] = useState(0);
    const [startFadeOut, setStartFadeOut] = useState(false);
    const { width, height } = Dimensions.get('window');
    const colorValue = useSharedValue(0);
    const fadeOutDuration = 200; // Ajusta la duración aquí para probar diferentes valores

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationPhase(prev => {
                if (prev < 4) {
                    return prev + 1;
                } else {
                    setStartFadeOut(true); // Iniciar fade-out rápidamente
                    colorValue.value = withTiming(1, { duration: 200 });
                    return prev; // Mantén la fase en 4
                }
            });
        }, 500); // Reduce este tiempo también si lo deseas más rápido
        return () => clearTimeout(timer);
    }, [animationPhase, colorValue]);

    const animatedTextStyle = useAnimatedStyle(() => {
        const colorInterpolated = interpolate(colorValue.value, [0, 0.8, 1], [255, 255, 0]);
        const color = `rgb(${colorInterpolated},${colorInterpolated},${colorInterpolated})`;
        return { color };
    });

    return (
        <MotiView
            style={styles.animationContainer}
            animate={{ opacity: startFadeOut ? 0 : 1 }}
            transition={{ type: 'timing', duration: fadeOutDuration }} // Fade-out más rápido
        >
            <MotiView
                from={{ translateX: scale(width / 2 + 75) }}
                animate={{
                    translateX: animationPhase === 0 ? scale(width / 2 + 75) : animationPhase === 1 ? scale(width / 4) : 0,
                    width: animationPhase === 4 ? scale(width * 1.1) : scale(150),
                    height: animationPhase === 4 ? verticalScale(height * 1) : verticalScale(140),
                    translateY: animationPhase === 4 ? verticalScale(height / 2.2) : 0,
                    borderRadius: animationPhase === 4 ? verticalScale(height / 5) : verticalScale(75),
                }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.circle}
            />
            <MotiView
                from={{ translateX: scale(-width / 2 - 50) }}
                animate={{
                    translateX: animationPhase === 0 ? scale(-width / 2 - 50) : animationPhase === 1 ? scale(-width / 4) : 0,
                    translateY: animationPhase === 4 ? verticalScale(-200) : 0,
                }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.textContainer}
            >
                <Text
                    fontSize={scale(24)}
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="DMSerifDisplay-Regular"
                    style={animatedTextStyle}
                >
                    ginpedia
                </Text>
            </MotiView>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f2e2a',
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
    },
    circle: {
        position: 'absolute',
        zIndex: 1,
        width: scale(150),
        height: verticalScale(150),
        borderRadius: verticalScale(75),
        backgroundColor: '#F4B929',
    },
});

export default AnimationDetail;
