import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
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
                    {/* Animación del cuadrado desde la izquierda */}
                    <MotiView
                        from={{ translateX: -width / 2 - 50 }}
                        animate={{
                            translateX: animationPhase >= 1 ? 0 : -width / 2 - 50,
                            translateY: animationPhase === 3 ? -200 : 0,
                        }}
                        transition={{ type: 'timing', duration: 1000 }}
                        style={styles.square} // Eliminé el ajuste de top
                    />

                    {/* Animación del círculo desde la derecha */}
                    <MotiView
                        from={{ translateX: width / 2 + 75 }}
                        animate={{
                            translateX: animationPhase >= 1 ? 0 : width / 2 + 75,
                            width: animationPhase === 3 ? width : 150,
                            height: animationPhase === 3 ? height / 2 + height / 4 : 150,
                            translateY: animationPhase === 3 ? height / 6 : 0,
                            borderRadius: animationPhase === 3 ? 0 : 75,
                        }}
                        transition={{ type: 'timing', duration: 1000 }}
                        style={styles.circle} // Eliminé el ajuste de top
                    />
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
        justifyContent: 'center', // Centra los elementos verticalmente
        alignItems: 'center', // Centra los elementos horizontalmente
    },
    square: {
        position: 'absolute',
        zIndex: 2,
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    circle: {
        position: 'absolute',
        zIndex: 1,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'red',
    },
});

export default AnimationDetail;
