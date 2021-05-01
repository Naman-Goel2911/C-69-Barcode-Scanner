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

    getCameraPermissions = async () =>
    {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: 'clicked',
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
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

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
            return(
            <View style = {styles.container}>
                <View>
                    <Image 
                    source = {require('../assets/scanner.jpg')}
                    style = {{width: 200, height: 200}}
                    />
                </View>
                <View>
                    <Text style = {styles.text}>
                        Barcode Scanner
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                    onPress = {()=>{
                        this.getCameraPermissions()
                    }}
                    style = {styles.permissionButton}
                    >
                        <Text style = {styles.permissionButtonText}>Request Camera Permissions</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                    onPress = {this.getCameraPermissions}
                    style = {styles.scanButton}
                    >
                        <Text style = {styles.scanButtonText}>Scan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    scanButton: {
        backgroundColor: 'yellow',
        width: 100,
        borderWidth: 1.5,
        borderLeftWidth: 0,
        margin: 10
    },
    scanButtonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 30,
        margin: 20
    },
    permissionButton: {
        margin: 20,
        
    },
    permissionButtonText: {
        textDecorationLine: 'underline',
        fontSize: 15
    }
})