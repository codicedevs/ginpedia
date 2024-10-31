import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-magnus';

const AnimatedIntro = ({ setIntro }) => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [startSecondAnimation, setStartSecondAnimation] = useState(false);
    const [startThirdAnimation, setStartThirdAnimation] = useState(false);
    const [startFourthAnimation, setStartFourthAnimation] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const { width } = Dimensions.get('window');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
            setTimeout(() => {
                setStartSecondAnimation(true);
                setTimeout(() => {
                    setStartThirdAnimation(true);
                    setTimeout(() => {
                        setStartFourthAnimation(true);

                        // Iniciar fade-out después de la cuarta animación
                        setTimeout(() => {
                            setFadeOut(true);
                            // Esperar a que termine el fade-out y luego cambiar setIntro a false
                            setTimeout(() => {
                                setIntro(false);
                            }, 500); // Duración del fade-out

                        }, 500); // Duración de la cuarta animación

                    }, 500);
                }, 1000);
            }, 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <MotiView
            from={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }} // Aplicar el fade-out
            transition={{ type: 'timing', duration: 500 }} // Duración del fade-out
            style={{
                ...StyleSheet.absoluteFillObject, // Hacer que el componente ocupe toda la pantalla en posición absoluta
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2f2e2a',
            }}
        >
            <MotiView
                from={{
                    rotate: '0deg',
                    translateX: 0,
                    width: 50,
                    height: 50,
                    borderRadius: 10
                }}
                animate={startFourthAnimation ? {
                    width: width * 3,
                    height: width * 3,
                    borderRadius: width
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
                style={{ backgroundColor: '#F4B929' }}
            />
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: startThirdAnimation ? 1 : 0 }}
                transition={{ type: 'timing', duration: 500 }}
                style={{ position: 'absolute', alignSelf: 'center' }}
            >
                <Text fontFamily="DMSerifDisplay-Regular" style={{ color: startFourthAnimation ? 'black' : 'white', fontSize: 30 }}>Ginpedia</Text>
            </MotiView>
        </MotiView>
    );
};

export default AnimatedIntro;
