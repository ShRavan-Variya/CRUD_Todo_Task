import React, { useEffect, useState } from 'react';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ic_splash = require('../../resources/ic_splash.png');
const ic_details = require('../../resources/ic_details.png');

const ItemDetailScreen = (props) => {
  const [itemId, setItemId] = useState()

  useEffect(() => {
    const {itemId} = props.route.params;
    setItemId(itemId)
  }, [])
  

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.viewCenter}>
        <View style={styles.viewHeader}>
          <Image source={ic_splash} style={styles.imageHeader} resizeMode={'contain'} />
          <Text style={styles.textTitle}>{'CRUN TODO TASKS'}</Text>
        </View>
        <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.viewFlexMainContainer}>
          <View style={styles.viewRow}>
            <Text style={styles.textCommon}>{'Item Title'}</Text>
            <Text style={styles.textCommon}>{'DD-MM-YYYY'}</Text>
          </View>
          <Text style={styles.textDescription}>{'Nulla in voluptate amet incididunt ipsum et. Aute amet labore occaecat ea pariatur veniam culpa fugiat eu mollit magna eu. Esse dolore proident exercitation duis sit dolore in sint ullamco ullamco amet officia reprehenderit. Est nulla eiusmod mollit ipsum labore minim laboris. Culpa anim fugiat labore voluptate esse voluptate eiusmod amet laboris consequat in excepteur mollit.\n\n\nNulla in voluptate amet incididunt ipsum et. Aute amet labore occaecat ea pariatur veniam culpa fugiat eu mollit magna eu. Esse dolore proident exercitation duis sit dolore in sint ullamco ullamco amet officia reprehenderit. Est nulla eiusmod mollit ipsum labore minim laboris. Culpa anim fugiat labore voluptate esse voluptate eiusmod amet laboris consequat in excepteur mollit.\n\n\nNulla in voluptate amet incididunt ipsum et. Aute amet labore occaecat ea pariatur veniam culpa fugiat eu mollit magna eu. Esse dolore proident exercitation duis sit dolore in sint ullamco ullamco amet officia reprehenderit. Est nulla eiusmod mollit ipsum labore minim laboris. Culpa anim fugiat labore voluptate esse voluptate eiusmod amet laboris consequat in excepteur mollit.\n\n\nNulla in voluptate amet incididunt ipsum et. Aute amet labore occaecat ea pariatur veniam culpa fugiat eu mollit magna eu. Esse dolore proident exercitation duis sit dolore in sint ullamco ullamco amet officia reprehenderit. Est nulla eiusmod mollit ipsum labore minim laboris. Culpa anim fugiat labore voluptate esse voluptate eiusmod amet laboris consequat in excepteur mollit.'}</Text>
          <Image source={ic_details} resizeMode={'cover'} style={styles.imageMain} />
          <View style={[styles.viewRow, {marginTop: 25}]}>
            <View style={{flex: 1, marginRight: 8}}>
              <Button title={'DONE'} onPress={() => {
                props.route.params.onGoBack(itemId);
                props.navigation.goBack();
              }} />
            </View>
            <View style={{flex: 1, marginLeft: 8}}>
              <Button title={'Cancel'} onPress={() => {props.navigation.goBack()}} />
            </View>
          </View>
        </ScrollView>
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
    padding: 15,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCommon: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 13,
    color: '#000',
    marginVertical: 35,
  },
  imageMain: {
    width: '100%',
    height: 250,
  },
})

export default ItemDetailScreen;