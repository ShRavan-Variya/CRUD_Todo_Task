import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ic_splash = require('../../resources/ic_splash.png');
const ic_menu = require('../../resources/ic_menu.png');
const ic_close = require('../../resources/ic_close.png');
const ic_camera = require('../../resources/ic_camera.png');

const HomeScreen = (props) => {
  const [listOfTasks, setListOfTasks] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [textTitle, setTextTitle] = useState('')
  const [textDescription, setTextDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    doGetCommonData()
  }, [])

  const doGetCommonData = () => {
    const newList = [];
    for (let index = 0; index < 15; index++) {
      newList.push({
        id: index + 1,
        isDone: false,
        title: `ABC ABC ABC ${index + 1}`
      })
    }
    setListOfTasks(newList);
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.viewMainItem} onPress={() => props.navigation.navigate('ItemDetailScreen')}>
        <Image source={ic_splash} style={styles.imageItem} resizeMode={'contain'} />
        <Text style={styles.textItem}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.viewCenter}>
        <View style={styles.viewHeader}>
          <Image
            source={ic_splash}
            style={styles.imageHeader}
            resizeMode={'contain'}
          />
          <Text style={styles.textTitle}>{'CRUN TODO TASKS'}</Text>
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Image
              source={ic_menu}
              style={styles.imageHeader}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewFlexMainContainer}>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.dateShow} onPress={() => { }}>
              <Text style={styles.textDate}>{'DD-MM-YYYY'}</Text>
            </View>
          </View>
          <FlatList
            data={listOfTasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => (index+1).toString()}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMenu}
        onRequestClose={() => {
          setShowMenu(!showMenu);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.viewRow}>
              <Text style={styles.texTitleItem}>{'Add Item'}</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowMenu(!showMenu);
                }}>
                <Image
                  source={ic_close}
                  resizeMode={'contain'}
                  style={styles.imageClose}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.paddingV10}>
              <Text style={styles.textCommonTitle}>{'Title'}</Text>
              <TextInput
                value={textTitle}
                onChangeText={setTextTitle}
                style={styles.inputTextStyle}
                placeholder={'Please enter title'}
              />
            </View>
            <View style={styles.paddingV10}>
              <Text style={styles.textCommonTitle}>{'Description'}</Text>
              <TextInput
                multiline={true}
                value={textDescription}
                onChangeText={setTextDescription}
                style={[styles.inputTextStyle, { height: 150 }]}
                placeholder={'Please enter title'}
              />
            </View>

            <View style={styles.viewRow}>
              <TouchableOpacity
                style={[
                  styles.viewPicker,
                  { paddingHorizontal: 15, marginRight: 5 },
                ]}
                onPress={() => { }}>
                <Text style={styles.textDate}>{'DD-MM-YYYY'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.viewPicker, { marginLeft: 5 }]}
                onPress={() => { }}>
                {selectedImage ? (
                  <Image
                    source={ic_camera}
                    resizeMode={'contain'}
                    style={styles.imagePicker}
                  />
                ) : (
                  <Text style={styles.textDate}>{'Pick Image'}</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 15 }}>
              <Button
                title={'Save'}
                onPress={() => {
                  setShowMenu(!showMenu);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
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
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  viewFlexMainContainer: {
    padding: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    margin: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texTitleItem: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  imageClose: {
    height: 18,
    width: 18,
  },
  paddingV10: {
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
  viewPicker: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDate: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  imagePicker: {
    height: 15,
    width: 15,
  },
  dateShow: {
    height: 45,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageItem: {
    height: 25,
    width: 25,
  },
  textItem: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default HomeScreen;