import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './screens/ScanScreen'

export default class App extends React.Component{
  render()
  {
    return(
      <View style = {styles.container}>
        <ScanScreen />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
})
