import { MotiText, MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

type AnimationProps = {
    onAnimationComplete: () => void;
}

function AnimationDetail({ onAnimationComplete }: AnimationProps) {
    const [animationPhase, setAnimationPhase] = useState(0);
    const [startFadeOut, setStartFadeOut] = useState(false);
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (animationPhase < 3) {
                setAnimationPhase((prev) => prev + 1);
                if (animationPhase === 2) {
                    setStartFadeOut(true);
                }
            }
        }, 700);

        return () => clearTimeout(timer);
    }, [animationPhase]);

    return (
        <MotiView
            style={styles.animationContainer}
            animate={{ opacity: startFadeOut ? 0 : 1 }}
            transition={{ type: 'timing', duration: 500 }}
            onDidAnimate={(key, finished) => {
                if (key === 'opacity' && finished && startFadeOut) {
                    onAnimationComplete();
                }
            }}
        >
            <MotiView
                from={{ translateX: scale(width / 2 + 75) }}
                animate={{
                    translateX: animationPhase === 0 ? scale(width / 2 + 75) : animationPhase === 1 ? scale(width / 4) : 0,
                    width: animationPhase === 3 ? scale(width * 1.1) : scale(150),
                    height: animationPhase === 3 ? verticalScale(height * 1) : verticalScale(140),
                    translateY: animationPhase === 3 ? verticalScale(height / 2.2) : 0,
                    borderRadius: animationPhase === 3 ? verticalScale(height / 5) : verticalScale(75),
                }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.circle}
            />
            <MotiView
                from={{ translateX: scale(-width / 2 - 50) }}
                animate={{
                    translateX: animationPhase === 0 ? scale(-width / 2 - 50) : animationPhase === 1 ? scale(-width / 4) : 0,
                    translateY: animationPhase === 3 ? verticalScale(-200) : 0,
                }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.textContainer}
            >
                <MotiText
                    style={styles.text}
                    animate={{
                        color: animationPhase === 2 ? 'black' : 'white',
                    }}
                    transition={{
                        color: { type: 'timing', duration: 500 },
                    }}
                >
                    ginpedia
                </MotiText>
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
        backgroundColor: '#2f2e2a'
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
    },
    text: {
        fontSize: scale(24),
        fontWeight: 'bold',
        textAlign: 'center',
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
