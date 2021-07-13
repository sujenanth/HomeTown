import React, {useState} from "react";
import {Box, Center, Container, Heading, HStack, NativeBaseProvider, Text} from "native-base";
import Header from "./Header";
import {useTheme} from "@react-navigation/native";
import Heads from "../utils/coins/Heads";
import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";

export default function CoinFlip(){

    const [coin, setCoin] = useState();


    const theme = useTheme();

    return(
        <NativeBaseProvider>
            <HStack height={'20%'} top={10} >
                <Header name={"Coin Flip"} />
            </HStack>
            <Center
                height={'75%'}
                p={5}
            >
                <Box
                    height={'100%'}
                    width={'100%'}
                    p={5}
                >

                </Box>
            </Center>
        </NativeBaseProvider>
    )
}