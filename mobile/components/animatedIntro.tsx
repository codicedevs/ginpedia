import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';

const AnimatedIntro = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [startSecondAnimation, setStartSecondAnimation] = useState(false);
    const [startThirdAnimation, setStartThirdAnimation] = useState(false);
    const [startFourthAnimation, setStartFourthAnimation] = useState(false);

    // Obtener las dimensiones de la pantalla para el tamaño del círculo
    const { width, height } = Dimensions.get('window');

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
                    // Inicia la cuarta animación después de que finaliza la tercera
                    setTimeout(() => {
                        setStartFourthAnimation(true);
                    }, 500); // Duración de la tercera animación
                }, 1000);
            }, 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
            <MotiView
                from={{
                    rotate: '0deg',
                    translateX: 0,
                    width: 50,
                    height: 50,
                    borderRadius: 10
                }}
                animate={startFourthAnimation ? {
                    width: width * 3, // Suficientemente grande para cubrir toda la pantalla
                    height: width * 3,
                    borderRadius: width // Mantenerlo como círculo mientras crece
                } : startThirdAnimation ? {
                    translateX: 100,
                    width: 10,
                    height: 10,
                    borderRadius: 12.5
                } : startSecondAnimation ? {
                    width: 15,
                    height: 15,
                    borderRadius: 12.5
                } : startAnimation ? {
                    rotate: '405deg',
                    width: 100,
                    height: 100
                } : {}}
                transition={{
                    type: 'timing',
                    duration: startFourthAnimation ? 500 : startThirdAnimation ? 500 : startSecondAnimation ? 1000 : 2000
                }}
                style={{ backgroundColor: 'blue' }}
            />
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: startThirdAnimation ? 1 : 0 }}
                transition={{ type: 'timing', duration: 500 }}
                style={{ position: 'absolute', alignSelf: 'center' }}
            >
                <Text style={{ color: startFourthAnimation ? 'black' : 'white', fontSize: 30 }}>Staladev</Text>
            </MotiView>
        </View>
    )
}

export default AnimatedIntro;