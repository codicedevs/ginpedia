import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-magnus';
import { scale, verticalScale } from 'react-native-size-matters';

interface AnimationDetailProps {
    setFinishedAnimation: React.Dispatch<React.SetStateAction<boolean>>; // Tipado del setFinishedAnimation
}

function AnimationDetail({ setFinishedAnimation }: AnimationDetailProps) {
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

    // Ejecutamos setFinishedAnimation en true después de que la fase 3 haya terminado
    const handleAnimationComplete = () => {
        if (animationPhase === 3) {
            setFinishedAnimation(true);
        }
    };

    return (
        <MotiView
            style={styles.animationContainer}
            animate={{ opacity: startFadeOut ? 0 : 1 }}
            transition={{ type: 'timing', duration: 500 }}
            onDidAnimate={() => handleAnimationComplete()} // Callback cuando la animación ha terminado
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
                onDidAnimate={() => handleAnimationComplete()} // Verificar cuando la animación de la vista haya terminado
            />
            <MotiView
                from={{ translateX: scale(-width / 2 - 50) }}
                animate={{
                    translateX: animationPhase === 0 ? scale(-width / 2 - 50) : animationPhase === 1 ? scale(-width / 4) : 0,
                    translateY: animationPhase === 3 ? verticalScale(-200) : 0,
                }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.textContainer}
                onDidAnimate={() => handleAnimationComplete()} // Callback en la animación del texto
            >
                <Text
                    fontSize={scale(24)}
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
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#f4acb4',
    },
});

export default AnimationDetail;
