import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const AnimatedIntro = () => {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        // Espera 1 segundo antes de iniciar la animación
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
            <MotiView
                from={{ rotate: '0deg', width: 50, height: 50 }}
                animate={startAnimation ? {
                    rotate: '405deg',
                    width: 100,
                    height: 100
                } : {}}
                transition={{ type: 'timing', duration: 2000 }}
                style={{ backgroundColor: 'blue', width: 50, height: 50, borderRadius: 10 }}
            />
        </View>
    )
}

export default AnimatedIntro;
