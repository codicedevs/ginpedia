import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-magnus';
import { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import { customTheme } from '../utils/theme';

type AnimationProps = {
    onAnimationComplete: () => void;
    isFetching: boolean;
    imageloaded: boolean;
}

function LoopAnimation({ onAnimationComplete, isFetching, imageloaded }: AnimationProps) {
    const { width } = Dimensions.get('window');
    const textTranslateX = useSharedValue(-width);
    const circleTranslateX = useSharedValue(width);
    const [animationRunning, setAnimationRunning] = useState(false);

    const cSize = scale(150);
    const cRadius = cSize / 2;

    useEffect(() => {
        if (isFetching || !imageloaded) {
            if (!animationRunning) {
                startAnimation();
            }
        } else {
            if (!animationRunning) {
                onAnimationComplete();
            }
        }
    }, [isFetching, imageloaded, animationRunning]);

    const startAnimation = () => {
        textTranslateX.value = -width;
        circleTranslateX.value = width;

        setAnimationRunning(true);

        textTranslateX.value = withSequence(
            withTiming(0, { duration: 1500 }),
            withTiming(width, { duration: 750 }, (finished) => {
                if (finished) {
                    runOnJS(setAnimationRunning)(false);
                }
            })
        );

        circleTranslateX.value = withSequence(
            withTiming(0, { duration: 1500 }),
            withTiming(-width, { duration: 750 }, (finished) => {
                if (finished) {
                    runOnJS(setAnimationRunning)(false);
                }
            })
        );
    };

    const textStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: textTranslateX.value }],
    }));

    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: circleTranslateX.value }],
        width: cSize, // Equal width and height for a perfect circle
        height: cSize,
        borderRadius: cRadius, // Half of width/height to make it circular
    }));

    return (
        <MotiView style={styles.animationContainer}>
            <MotiView style={[styles.circle, circleStyle]} />
            <MotiView style={[styles.textContainer, textStyle]}>
                <Text
                    fontSize={customTheme.fontSize.title}
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="DMSerifDisplay-Regular"
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
        backgroundColor: '#f9e2e4',
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
    },
    circle: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#f4acb4',
    },
});

export default LoopAnimation;
