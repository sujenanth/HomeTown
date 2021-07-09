import React, {useRef, useState} from 'react'
import {AlertDialog, Button, Center, Divider, NativeBaseProvider} from "native-base";


export default function DescriptionDialog(props){

    const cancelRef = useRef();

    return(
                <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={props.open}
                    onClose={props.onClose}
                    motionPreset={'fade'}
                    bgColor={'white'}
                    height={'30%'}
                    width={'80%'}
                    alignSelf={'center'}
                    padding={6}
                >
                    <AlertDialog.Header>
                        {props.header}
                    </AlertDialog.Header>
                    <Divider/>
                    <AlertDialog.Body top={2}>
                        {props.body}
                    </AlertDialog.Body>
                    <AlertDialog.Footer position={'absolute'} right={2} bottom={2} >
                        <Button onPress={props.onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme={"red"} onPress={props.onClose} ml={3}>
                            Done
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog>
    )

}