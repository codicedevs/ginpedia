import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', flexDirection: 'row' }}>
            <MotiView
                from={{
                    rotate: '0deg',
                    translateX: 0,
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
                    width: 25,
                    height: 25,
                    borderRadius: 12.5
                } : startAnimation ? {
                    rotate: '405deg',
                    width: 100,
                    height: 100
                } : {}}
                transition={{
                    type: 'timing',
                    duration: startThirdAnimation ? 500 : startSecondAnimation ? 1000 : 2000
                }}
                style={{ backgroundColor: 'blue', alignSelf: 'center' }}  // Asegura que el círculo esté alineado verticalmente
            />

            <MotiView
                from={{ opacity: 0 }} // Comienza con opacidad 0
                animate={{ opacity: startThirdAnimation ? 1 : 0 }} // Aumenta la opacidad si la tercera animación ha comenzado
                transition={{ type: 'timing', duration: 500 }} // Sincroniza con la duración de la tercera animación
                style={{ position: 'absolute', alignSelf: 'center' }} // Alinea el texto en el centro horizontal y vertical
            >
                <Text style={{ color: 'white', fontSize: 30 }}>Staladev</Text>
            </MotiView>
        </View>
    )
}

export default AnimatedIntro;
