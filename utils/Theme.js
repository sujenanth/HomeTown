import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export const themes = {
    dark : {
        dark: true,
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: 'white',
            background: '#181818',
            backgroundColorLightDark: '#212124',
            backgroundColorGrey: '#818181',
            newsCard: '#475569',
            newsCardText: '#FFFAFA',
            iconPrimary: '#3E4C59',
            iconSecondary: '#BCCCDC',
        }
    },
    light : {
        dark: false,
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'black',
            newsCard: '#475569',
            newsCardText: '#FFFAFA',
            iconPrimary: '#BCCCDC',
            iconSecondary: '#3E4C59',
        }
    }
};