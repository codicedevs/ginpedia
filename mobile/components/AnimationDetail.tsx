import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Div } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyHeader } from '../components/layout/header';

function AnimationDetail() {
    const [animationPhase, setAnimationPhase] = useState(0);
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        // Controla las fases de la animación
        const timer = setTimeout(() => {
            setAnimationPhase((prev) => (prev < 3 ? prev + 1 : prev));
        }, 2000); // Cambia de fase cada 2 segundos

        return () => clearTimeout(timer);
    }, [animationPhase]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Div bg="background" flex={1}>
                <MyHeader />
                <Div style={styles.animationContainer}>
                    {/* Animación del círculo desde la derecha */}
                    <MotiView
                        from={{ translateX: width / 2 + 75 }}
                        animate={{
                            translateX: animationPhase === 0 ? width / 2 + 75 : animationPhase === 1 ? width / 4 : 0,
                            width: animationPhase === 3 ? width * 1.1 : 150,
                            height: animationPhase === 3 ? height * 1 : 150,
                            translateY: animationPhase === 3 ? height / 3.5 : 0,
                            borderRadius: (animationPhase === 3 ? height / 4 : 75), // Mantener siempre borde redondo
                        }}
                        transition={{ type: 'timing', duration: 1000 }}
                        style={styles.circle}
                    />

                    {/* Animación del texto "ginpedia" desde la izquierda */}
                    <MotiView
                        from={{ translateX: -width / 2 - 50 }}
                        animate={{
                            translateX: animationPhase === 0 ? -width / 2 - 50 : animationPhase === 1 ? -width / 4 : 0,
                            translateY: animationPhase === 3 ? -200 : 0,
                        }}
                        transition={{ type: 'timing', duration: 1000 }}
                        style={styles.textContainer}
                    >
                        <MotiText
                            style={styles.text}
                            animate={{
                                color: animationPhase === 2 ? 'black' : 'white',
                            }}
                            transition={{
                                color: { type: 'timing', duration: 500 }, // Transición suave del color
                            }}
                        >
                            ginpedia
                        </MotiText>
                    </MotiView>
                </Div>
            </Div>
        </SafeAreaView>
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
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2, // Asegura que el texto esté por encima del círculo
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    circle: {
        position: 'absolute',
        zIndex: 1,
        width: 150,
        height: 150,
        borderRadius: 75, // Mantener siempre borde redondo
        backgroundColor: 'yellow',
    },
});

export default AnimationDetail;
