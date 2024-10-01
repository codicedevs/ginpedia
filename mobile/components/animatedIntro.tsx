import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const AnimatedIntro = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [startSecondAnimation, setStartSecondAnimation] = useState(false);
    const Text = 'Staladev'

    useEffect(() => {
        // Espera 1 segundo antes de iniciar la primera animación
        const timer = setTimeout(() => {
            setStartAnimation(true);
            // Inicia la segunda animación después de que finaliza la primera
            setTimeout(() => {
                setStartSecondAnimation(true);
            }, 2000); // Duración de la primera animación
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
            <MotiView
                from={{ rotate: '0deg', width: 50, height: 50, borderRadius: 10 }}
                animate={startSecondAnimation ? {
                    width: 25, // La mitad del tamaño inicial del cuadrado
                    height: 25,
                    borderRadius: 12.5 // Hace que se convierta en un círculo
                } : startAnimation ? {
                    rotate: '405deg',
                    width: 100,
                    height: 100
                } : {}}
                transition={startSecondAnimation ? { type: 'timing', duration: 1000 } : { type: 'timing', duration: 2000 }}
                style={{ backgroundColor: 'blue', width: 50, height: 50 }}
            />
        </View>
    )
}

export default AnimatedIntro;
