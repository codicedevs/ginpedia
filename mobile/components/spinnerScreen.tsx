import { useIsFetching } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { LoadingText, SpinnerContainer } from './styled/styled';

const SpinnerScreen = ({ show }: { show: boolean }) => {
    const isFetching = useIsFetching({
        predicate: (query) => query.meta?.triggerGlobalLoader === true,
    });

    if (!show) return null;

    return (
        <SpinnerContainer>
            <ActivityIndicator size="large" color="black" />
            <LoadingText >Cargando...</LoadingText>
        </SpinnerContainer>
    );
}

export default SpinnerScreen;
