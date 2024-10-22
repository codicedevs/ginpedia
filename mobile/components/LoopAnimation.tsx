import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-magnus';
import { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

type AnimationProps = {
    onAnimationComplete: () => void;
    isFetching: boolean;
    imageLoading: boolean;
}

function LoopAnimation({ onAnimationComplete, isFetching, imageLoading }: AnimationProps) {
    const { width } = Dimensions.get('window');
    const textTranslateX = useSharedValue(-width);  // Inicia desde fuera de la pantalla izquierda
    const circleTranslateX = useSharedValue(width);  // Inicia desde fuera de la pantalla derecha
    const [animationRunning, setAnimationRunning] = useState(false);

    console.log(isFetching, imageLoading, animationRunning)

    useEffect(() => {
        // Total de duración del ciclo de animación
        const totalDuration = 1500 + 750;

        const startAnimation = () => {
            setAnimationRunning(true); // Animación en progreso

            // Mover texto hacia el centro y luego hacia fuera
            textTranslateX.value = withRepeat(
                withSequence(
                    withTiming(0, { duration: 1500 }), // Mover hacia el centro
                    withTiming(width, { duration: 750 }) // Mover hacia fuera
                ),
                -1,  // Repetir infinitamente
                false // No invertir automáticamente
            );

            // Mover círculo hacia el centro y luego hacia fuera
            circleTranslateX.value = withRepeat(
                withSequence(
                    withTiming(0, { duration: 1500 }), // Mover hacia el centro
                    withTiming(-width, { duration: 750 }) // Mover hacia fuera
                ),
                -1,  // Repetir infinitamente
                false // No invertir automáticamente
            );
        };

        if (!isFetching && !imageLoading) {
            if (!animationRunning) {
                startAnimation(); // Iniciar la animación si no está en progreso
            }
        } else if (animationRunning) {
            setAnimationRunning(false); // Resetear el estado si hay fetching o loading

            // Detener la animación
            textTranslateX.value = 0;
            circleTranslateX.value = 0;

            // Llamar a onAnimationComplete solo si estaba en curso
            onAnimationComplete();
        }

        // Cleanup function
        return () => {
            setAnimationRunning(false); // Limpiar el estado al desmontar
        };
    }, [isFetching, imageLoading]); // Ejecutar cuando cambien isFetching o imageLoading

    const textStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: textTranslateX.value }],
    }));

    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: circleTranslateX.value }],
        width: 150,
        height: 150,
        borderRadius: 75,
    }));

    return (
        <MotiView style={styles.animationContainer}>
            <MotiView style={[styles.circle, circleStyle]} />
            <MotiView style={[styles.textContainer, textStyle]}>
                <Text
                    fontSize={24}
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="DMSerifDisplay-Regular"
                >
                    ginpedia
                </Text>
            </MotiView>
            {animationRunning && (
                <Text style={styles.debugText}>Animation Running</Text>
            )}
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
        backgroundColor: '#F4B929',
    },
    debugText: {
        position: 'absolute',
        bottom: 50,
        color: 'white',
        fontSize: 16,
    },
});

export default LoopAnimation;
