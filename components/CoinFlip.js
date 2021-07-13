import React, {useState} from "react";
import {Box, Center, Container, Heading, HStack, NativeBaseProvider} from "native-base";
import Header from "./Header";
import {useTheme} from "@react-navigation/native";

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
                    <Heading>asddas</Heading>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}