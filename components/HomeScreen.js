import {
    AspectRatio,
    Box,
    Button,
    Center,
    Heading,
    HStack,
    NativeBaseProvider,
    Stack,
    Switch,
    useToast
} from "native-base";
import React, {useEffect, useState} from 'react';
import {Text} from "native-base";
import StyleSheet from "react-native-web/src/exports/StyleSheet";
import {View} from "react-native";
import Header from "./Header";
import App from "../App";
import UserStores from "../Stores/UserStores";
import {useTheme} from "@react-navigation/native";

export default function HomeScreen(props){

    const [darkmode, setDarkmode] = useState(props.darkmode);

    const [dark, setDark] = useState(darkmode);


    const { colors } = useTheme();

    return(
        <NativeBaseProvider>
            <HStack top={10} height={'17%'} >
                <Header name={"Home"} color={colors.primary} />
            </HStack>
            <Box m={5}>
                <Box
                    shadow={2}
                    rounded={"lg"}
                    p={8}
                    bg={'#db2777'}
                >
                    <Text bold position={'absolute'} color={'white'} top={0} m={[4,4,8]}>
                        Welcome Back
                    </Text>
                </Box>
                <Box
                    shadow={2}
                    rounded={"lg"}
                    p={8}
                    bg={'#8C92AC'}
                    top={5}
                    position={'relative'}
                >
                    <Text bold position={'absolute'} color={'white'} m={[4,4,8]}>
                        Dark Mode:
                    </Text>
                    <Switch
                        isChecked={darkmode}
                        onToggle={(e) => {
                            props.setDarkmode(e)
                        }}
                        size={"lg"}
                        position={'absolute'}
                        right={5}
                        top={'3'}
                        colorScheme={'emerald'}
                    />
                </Box>
            </Box>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container : {
        padding : 10
    },
    header : {
        marginTop : '100'
    }
})