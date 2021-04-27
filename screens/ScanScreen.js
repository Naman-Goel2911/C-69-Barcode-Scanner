import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{

    constructor()
    {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'      
        }
    }

    getCameraPermissions = async (id) =>
    {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: id,
            scanned: false
        })
    }

    handleBarcodeScanned = async ({type,data}) => 
    {
        const {buttonState} = this.state.buttonState
        if(buttonState === "BookId")
        {
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            })
        }
        else if(buttonState === "StudentId")
        {
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal'
            })
        }
    }

    render()
    {
        if(this.state.buttonState === 'clicked' && hasCameraPermissions)
        {
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else{
            <View style = {styles.container}>
                <View>
                    <Image 
                    source = {require('../assets/scanner.jpg')}
                    style = {{width: 200, height: 200}}
                    />
                </View>
                <View>
                    <TouchableOpacity
                    onPress = {this.getCameraPermissions}
                    style = {styles.button}
                    >
                        <Text>Request Camera Permissions</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                    onPress = {this.getCameraPermissions}
                    style = {styles.button}
                    >
                        <Text>Scan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'yellow',
        width: 100,
        borderWidth: 1.5,
        borderLeftWidth: 0,
    },
})