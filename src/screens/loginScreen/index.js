import React, { useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ic_splash = require('../../resources/ic_splash.png');

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.viewCenter}>
        <View style={styles.viewHeader}>
          <Image source={ic_splash} style={styles.imageHeader} resizeMode={'contain'} />
          <Text style={styles.textTitle}>{'CRUN TODO TASKS'}</Text>
        </View>
        <View style={styles.viewFlexMainContainer}>
          <View style={styles.paddingHV10}>
            <Text style={styles.textCommonTitle}>{'Email'}</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputTextStyle}
              placeholder={'Please enter email'}
            />
          </View>
          <View style={styles.paddingHV10}>
            <Text style={styles.textCommonTitle}>{'Password'}</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.inputTextStyle}
              placeholder={'Please enter password'}
            />
            <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.textForgot}>{'Forgot password'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewButton}>
          <Button title={'Login'} onPress={() => {props.navigation.navigate('HomeScreen')}} />
          <View style={styles.viewRow}>
            <Text style={styles.textNoAc}>{"Don't have account?"}</Text>
            <TouchableOpacity onPress={() => {props.navigation.navigate('RegisterScreen')}}>
              <Text style={styles.textRegister}>{"Register"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },
  viewCenter: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageHeader: {
    height: 25,
    width: 25,
  },
  textTitle: {
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  viewFlexMainContainer: {
    flex: 1,
    paddingTop: 90,
  },
  paddingHV10: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textCommonTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  inputTextStyle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    height: 45,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  textForgot: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
  viewButton: {
    margin: 15,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  textNoAc: {
    fontSize: 12,
    color: '#000',
    marginHorizontal: 3,
  },
  textRegister: {
    fontSize: 12,
    color: '#000',
    marginHorizontal: 3,
    fontWeight: 'bold',
  },
})

export default LoginScreen;