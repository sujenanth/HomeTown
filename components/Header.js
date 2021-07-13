import React, {useState} from 'react';
import {Box, Center, Divider, Fade, Heading, HStack, NativeBaseProvider, VStack} from "native-base";
import {useTheme} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Searchbar} from "react-native-paper";
import {TouchableOpacity} from "react-native";


export default function Header(props){

    const theme = useTheme();

    const { fade, setFade } = props;


    return(
        <NativeBaseProvider>
            <HStack
                position={'relative'}
                height={'100%'}
            >
                <Box paddingLeft={5} height={'25%'} top={5} >
                    <Heading size={'2xl'} color={theme.colors.primary}>{props.name}</Heading>
                </Box>
                <Box position={'absolute'} right={8} top={'20%'}>
                    <HStack justifyContent={'center'} alignSelf={'center'} alignItems={'center'} space={6}>
                        <Heading size={'sm'} right={-7} color={theme.dark ? '#d6d3d1' : null} >{props.subHeader}</Heading>
                        {
                            props.search &&
                            <HStack space={3}>
                                <TouchableOpacity onPress={() => {
                                    setFade(!fade)
                                    console.log(fade)
                                }}>
                                    <MaterialCommunityIcons size={30} color={theme.colors.primary} name={"text-search"} />
                                </TouchableOpacity>
                            </HStack>
                        }
                    </HStack>
                </Box>
            </HStack>
        </NativeBaseProvider>
    )
}