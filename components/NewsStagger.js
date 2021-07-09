import React, {useState} from 'react';
import {Box, IconButton, Stagger} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {MaterialIcons, Ionicons } from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";

export default function NewsStagger(props){

    const { open, setOpen, setFade } = props;

    const theme = useTheme();

    const Icon = (props) => (
        <TouchableOpacity>
            <IconButton
                {...props}
                mb={5}
                variant={"solid"}
                rounded={"full"}
                shadow={5}
                bgColor={theme.colors.iconSecondary}
                onPress={props.onToggle}
                icon={
                    props.material === '' ? <MaterialCommunityIcons color={theme.colors.iconPrimary} size={!props.materialsize ? 24 : props.materialsize} name={props.name} />
                        : props.material === 'material' ? <MaterialIcons name={props.name} color={theme.colors.iconPrimary} size={!props.materialsize ? 24 : props.materialsize} />
                        :  <Ionicons name={props.name} color={theme.colors.iconPrimary} size={!props.materialsize ? 24 : props.materialsize} />
                }
            />
        </TouchableOpacity>
    )

    const onChange = (category) => {
        props.fetch(category);
        setFade(false);
    }

    return(
        <Box
            width={10}
            position={'absolute'}
            right={5}
            bottom={0}
        >
            <Box
                minH={20}
            >
                <Stagger
                    visible={open}
                    initial={{
                        opacity : 0,
                        scale : 0,
                        translateY: 34
                    }}
                    animate={{
                        translateY : 0,
                        scale : 1,
                        opacity: 1,
                        transition: {
                            type: "spring",
                            mass: 0.8,
                            stagger: {
                                offset: 30,
                                reverse: true
                            }
                        }
                    }}
                    exit={{
                        translateY: 34,
                        scale: 0.5,
                        opacity: 0,
                        transition: {
                            duration: 100,
                            stagger: {
                                offset: 30,
                                reverse: true
                            }
                        }
                    }}
                >
                    <Icon onToggle={() => {
                        props.fetch('sports')
                        setFade(false)
                    }} material={'material'} name={'sports-tennis'} />
                    <Icon onToggle={() => {
                        props.fetch('technology')
                        setFade(false)
                    }} material={''} name={'code-less-than-or-equal'} />
                    <Icon onToggle={() => {
                        props.fetch('business')
                        setFade(false)
                    }} material={'ion'} name={'business'} />
                </Stagger>
            </Box>
            <Icon materialsize={40} name={"newspaper"} size={'60px'} right={3} onToggle={setOpen} />
        </Box>
    )
}