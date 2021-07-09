import React, {useEffect, useState} from 'react';
import {
    AlertDialog,
    Box,
    Button,
    Center,
    Container,
    Divider,
    FlatList,
    Heading,
    HStack,
    Input, KeyboardAvoidingView,
    List, useToast, VStack
} from "native-base";
import {Text} from "react-native-elements";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {TouchableOpacity, View} from "react-native";
import StyleSheet from "react-native-web/src/exports/StyleSheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from 'expo-haptics';
import Header from "./Header";
import {useTheme} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import DescriptionDialog from "../Dialog/DescriptionDialog";
export default function ToDoApp(){
    const [todos, setTodo] = useState([]);
    const [context, setContext] = useState();
    const [open, setOpen] = useState(false);
    const cancelRef = React.useRef();
    const onClose = () => setOpen(false);

    const { colors } = useTheme();

    const theme = useTheme();

    const toast = useToast();




    return(
        <NativeBaseProvider>
            <HStack top={10} height={'22%'}>
                <Header name={"To Do"} />
            </HStack>
            <HStack
                top={-30}
                space={3}
                alignSelf={'center'}
            >
                <KeyboardAvoidingView width={'70%'} behavior={"padding"} keyboardVerticalOffset={40}>
                    <Input
                        w={'100%'}
                        value={context}
                        variant={"outline"}
                        placeholder={"To Do"}
                        bg={"white"}
                        onChangeText={(e) => setContext(e)}
                        _light={{
                            placeholderTextColor: 'blueGray.400'
                        }}
                        _dark={{
                            placeholderTextColor:'blueGray.50'
                        }}
                    >
                    </Input>
                </KeyboardAvoidingView>
                <Button
                    bgColor={theme.dark ? 'white' : 'black'}
                    w={'15%'} onPress={() => {
                    let todo = {
                        id : (todos.length - 1),
                        context : context
                    }
                    if(context === ""){
                        console.log("empty")
                        toast.show({
                            render: () => {
                                return (
                                    <Box
                                        bg={'teal.500'}
                                        px={4}
                                        py={3}
                                        rounded={'md'}
                                    >
                                        Please insert text
                                    </Box>
                                )
                            }
                        })
                    }
                    else{
                        setTodo([...todos, todo])
                        setContext("");
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    }
                }}>
                    <MaterialCommunityIcons name={"plus"} size={21} color={theme.dark ? 'black' : 'white'}/>
                </Button>
            </HStack>

            <Box bg={"#283044"} shadow={3} paddingBottom={8} rounded={"lg"} m={5} maxHeight={'70%'}>
                <Container
                    padding={5}
                    width={'100%'}
                >
                    <Heading color={'white'}>List</Heading>
                    <Divider top={2} marginBottom={5} opacity={0.2} w={'40%'}/>
                </Container>
                <FlatList
                    data={todos}
                    inverted={true}
                    renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Box
                                    display={'flex'}
                                    alignSelf={'center'}
                                    alignContent={'center'}
                                    justifyContent={'center'}
                                    position={'relative'}
                                    w={'85%'} px={8} py={5} rounded={"md"} my={2} bg={"#78A1BB"}
                                >
                                    <Heading color={'#EBF5EE'} size={'md'}>{item.context}</Heading>
                                    <Box
                                        position={'absolute'}
                                        justifyContent={'center'}
                                        alignSelf={'flex-end'}
                                        right={10}
                                    >
                                        <TouchableOpacity onPress={() => {
                                            setOpen(true)
                                            console.log(colors)
                                        }
                                        } >
                                            <MaterialCommunityIcons name={"check"} color={'black'} size={30} />
                                        </TouchableOpacity>
                                    </Box>
                                </Box>
                            </TouchableOpacity>
                    )}
                />
            </Box>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    addSection : {
        display: 'flex',
        backgroundColor: 'red'
    }
})