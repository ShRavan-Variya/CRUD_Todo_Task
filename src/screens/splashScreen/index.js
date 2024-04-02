import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

const ic_splash = require('../../resources/ic_splash.png');

const SplashScreen = (props) => {

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('LoginScreen')
    }, 3500);
  }, [])
  

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.viewCenter}>
        <Image source={ic_splash} style={styles.imageSplash} resizeMode={'contain'} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSplash: {
    height: 100,
    width: 100,
  }
})

export default SplashScreen;