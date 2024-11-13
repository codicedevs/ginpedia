import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const FilterIcon = ({ width = 32, height = 32, color = 'black' }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill={color}
    >
        <Path d="M28,9H11a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
        <Path d="M7,9H4A1,1,0,0,1,4,7H7A1,1,0,0,1,7,9Z" />
        <Path d="M21,17H4a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z" />
        <Path d="M11,25H4a1,1,0,0,1,0-2h7a1,1,0,0,1,0,2Z" />
        <Path d="M9,11a3,3,0,1,1,3-3A3,3,0,0,1,9,11ZM9,7a1,1,0,1,0,1,1A1,1,0,0,0,9,7Z" />
        <Path d="M23,19a3,3,0,1,1,3-3A3,3,0,0,1,23,19Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,23,15Z" />
        <Path d="M13,27a3,3,0,1,1,3-3A3,3,0,0,1,13,27Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,13,23Z" />
        <Path d="M28,17H25a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z" />
        <Path d="M28,25H15a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
    </Svg>
);

export default FilterIcon;
