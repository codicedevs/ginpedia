import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const AnimatedIntro = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [startSecondAnimation, setStartSecondAnimation] = useState(false);
    const [startThirdAnimation, setStartThirdAnimation] = useState(false);

    useEffect(() => {
        // Espera 1 segundo antes de iniciar la primera animación
        const timer = setTimeout(() => {
            setStartAnimation(true);
            // Inicia la segunda animación después de que finaliza la primera
            setTimeout(() => {
                setStartSecondAnimation(true);
                // Inicia la tercera animación después de que finaliza la segunda
                setTimeout(() => {
                    setStartThirdAnimation(true);
                }, 1000); // Duración de la segunda animación
            }, 2000); // Duración de la primera animación
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
            <MotiView
                from={{
                    rotate: '0deg',
                    translateX: 0, // Inicia con translateX en 0
                    width: 50,
                    height: 50,
                    borderRadius: 10
                }}
                animate={startThirdAnimation ? {
                    translateX: 100, // Desplaza suavemente hacia la derecha
                    width: 25, // Mantiene el tamaño de la segunda animación
                    height: 25,
                    borderRadius: 12.5 // Mantiene la forma de círculo
                } : startSecondAnimation ? {
                    width: 25, // La mitad del tamaño inicial del cuadrado
                    height: 25,
                    borderRadius: 12.5 // Hace que se convierta en un círculo
                } : startAnimation ? {
                    rotate: '405deg',
                    width: 100,
                    height: 100
                } : {}}
                transition={{
                    type: 'timing',
                    duration: startThirdAnimation ? 500 : startSecondAnimation ? 1000 : 2000
                }}
                style={{ backgroundColor: 'blue' }}
            />
        </View>
    )
}

export default AnimatedIntro;
