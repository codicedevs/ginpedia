import { ThemeType } from "react-native-magnus";
import { moderateScale, scale } from "react-native-size-matters";
import "styled-components/native";
import { DefaultTheme as SCDefaultTheme } from "styled-components/native";

// Define el tipo de tu tema personalizado
export type CustomThemeType = ThemeType & {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        cardBorder: string;
        cardBg: string;
        darkerSecondary:string
    };
    fontFamily: {
        normal: string;
        secondary: string;
        bold: string;
        mItalic: string;
        light: string
    };
    fontSize: {
        small: number;
        medium: number;
        large: number;
        title: number;
        extraLarge: number;
    };
    borderRadius: {
        none: number;
        circle: number;
        medium: number;
        small: number;
        big: number;
    };
    spacing: {
        none: number;
        xs: number;
        small: number;
        medium: number;
        large: number;
        extraLarge: number;
    };
    shadowColor: string;
    name: string;
};

// Extiende la interfaz `DefaultTheme` usando el tipo `CustomThemeType`
declare module "styled-components/native" {
    export interface DefaultTheme extends CustomThemeType { }
}

export const customTheme: CustomThemeType = {
    colors: {
        primary: "#0070f3",
        secondary: "#f4acb4",
        accent: "#e91e63",
        background: "#FFFFFF",
        text: "#333333",
        cardBorder: "lightgray",
        cardBg: "#D9D9D9",
        darkerSecondary: "#fb838b"
    },
    fontFamily: {
        normal: "Montserrat-Regular",
        bold: "Montserrat-Bold",
        light: "Monsterrat-Light",
        mItalic: "Montserrat-MediumItalic",
        secondary: "DMSerifDisplay-Regular",
    },
    fontSize: {
        small: moderateScale(9),
        medium: moderateScale(16),
        large: moderateScale(20),
        title: moderateScale(24),
        extraLarge: moderateScale(32),
    },
    borderRadius: {
        none: 0,
        circle: 99999,
        medium: scale(5),
        small: scale(8),
        big: scale(16),
    },
    spacing: {
        none: 0,
        xs: scale(5),
        small: scale(8),
        medium: scale(16),
        large: scale(24),
        extraLarge: scale(32),
    },
    shadowColor: "black",
    name: "myTheme",
    components: {
        Text: {
            fontFamily: "Montserrat-Regular",
            color: 'black'
        },
        Input: {
            p: 0,
            py: 0,
            mb: 0
        },
    }
};
