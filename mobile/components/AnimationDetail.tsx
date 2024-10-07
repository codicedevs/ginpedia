import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyHeader } from '../components/layout/header';

function AnimationDetail() {
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        // Controla las fases de la animación y se ejecuta solo una vez
        if (animationPhase < 2) {
            const timer = setTimeout(() => {
                setAnimationPhase((prev) => prev + 1);
            }, 2000); // Cambia de fase cada 2 segundos

            return () => clearTimeout(timer);
        }
    }, [animationPhase]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Div bg="background" flex={1} px={"xl"}>
                <MyHeader />
                <ScrollDiv mt={200} showsVerticalScrollIndicator={false} flex={1}>
                    <Div mb={"xl"} alignItems="center" justifyContent="center" style={{ position: 'relative', height: 300 }}>
                        {/* Animación del cuadrado desde la izquierda */}
                        <MotiView
                            from={{ translateX: -400 }} // Comienza completamente fuera del área visible
                            animate={{ translateX: animationPhase === 1 ? -100 : animationPhase === 2 ? 0 : -400 }}
                            transition={{ type: 'timing', duration: 1000 }}
                            style={{
                                position: 'absolute',
                                zIndex: 2, // El cuadrado estará por encima del círculo
                                width: 100,
                                height: 100,
                                backgroundColor: 'blue',
                            }}
                        />

                        {/* Animación del círculo desde la derecha */}
                        <MotiView
                            from={{ translateX: 400 }} // Comienza completamente fuera del área visible
                            animate={{ translateX: animationPhase === 1 ? 100 : animationPhase === 2 ? 0 : 400 }}
                            transition={{ type: 'timing', duration: 1000 }}
                            style={{
                                position: 'absolute',
                                zIndex: 1, // El círculo estará detrás del cuadrado
                                width: 150,
                                height: 150,
                                borderRadius: 75,
                                backgroundColor: 'red',
                            }}
                        />
                    </Div>
                </ScrollDiv>
            </Div>
        </SafeAreaView>
    );
}

export default AnimationDetail;
