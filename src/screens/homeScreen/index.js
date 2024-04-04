import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
import DropPicker from '../../DropPicker';
import { checkPermission } from '../../permission/permission';
import { RNToasty } from 'react-native-toasty';

const ic_splash = require('../../resources/ic_splash.png');
const ic_menu = require('../../resources/ic_menu.png');
const ic_close = require('../../resources/ic_close.png');
const ic_camera = require('../../resources/ic_camera.png');
const ic_select = require('../../resources/ic_select.png');
const ic_unselect = require('../../resources/ic_unselect.png');

const HomeScreen = (props) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
  const [textSelectedDate, setTextSelectedDate] = useState('')
  const [listOfTasks, setListOfTasks] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [textTitle, setTextTitle] = useState('')
  const [textDescription, setTextDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [selectedModalId, setSelectedModalId] = useState()
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {

    Moment().locale('en');

    const newDate = Moment().format('DD - MM - YYYY')
    setTextSelectedDate(newDate)

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

  const refreshData = (itemId) => {
    const newList = [...listOfTasks];
    newList.map(item => {
      if (item.id === itemId) {
        item.isDone = true
      }
    })
    setListOfTasks(newList)
  }

  const toggleDatePicker = (id) => {
    if (id === 1) {
      setShowMenu(!showMenu);
    }
    setIsOpenDatePicker(!isOpenDatePicker);
  }

  const getImageById = async (id) => {
    const res = await checkPermission(id === 1 ? 'camera' : 'gallery');
    if (res.result === true) {
      try {
        if (id === 1) {
          launchCamera({
            mediaType: 'photo',
            quality: 1,
            maxWidth: 350,
            maxHeight: 350,
            cameraType: 'back',
          }).then((resImage) => {
            const resData = resImage.assets[0];
            setOverlayVisible(false)
            setShowMenu(!showMenu);
            const imageData = {
              type: resData.type,
              uri: resData.uri,
              name: resData.fileName,
            };
            setSelectedImage(imageData)
          });
        } else if (id === 2) {
          launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            maxWidth: 350,
            maxHeight: 350,
          }).then((resImage) => {
            const resData = resImage.assets[0];
            setOverlayVisible(false)
            setShowMenu(!showMenu);
            const imageData = {
              type: resData.type,
              uri: resData.uri,
              name: resData.fileName,
            };
            setSelectedImage(imageData)
          });
        }
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    } else {
      RNToasty.Show({title: 'Permission not granted!'});
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.viewMainItem} onPress={() => props.navigation.navigate('ItemDetailScreen', {onGoBack: refreshData, itemId: item.id})}>
        <Image source={item.isDone ? ic_select : ic_unselect} style={styles.imageItem} resizeMode={'contain'} />
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
            <TouchableOpacity style={styles.dateShow} onPress={() => {
              setSelectedModalId(2)
              toggleDatePicker(2)
            }}>
              <Text style={styles.textDate}>{textSelectedDate}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={listOfTasks}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.viewDivider} />}
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
                onPress={() => {
                  setSelectedModalId(1)
                  toggleDatePicker(1)
                }}>
                <Text style={styles.textDate}>{textSelectedDate}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.viewPicker, { marginLeft: 5 }]}
                onPress={() => {
                  setOverlayVisible(true)
                  setShowMenu(!showMenu);
                }}>
                {selectedImage && selectedImage.uri ? (
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
      <DatePicker
        modal
        mode={'date'}
        open={isOpenDatePicker}
        date={textSelectedDate ? new Date(Moment(textSelectedDate, 'DD - MM - YYYY')) : new Date()}
        onConfirm={(date) => {
          const newDate = Moment(date).format('DD - MM - YYYY')
          setTextSelectedDate(newDate)
          toggleDatePicker(selectedModalId)
        }}
        onCancel={() => {
          toggleDatePicker(selectedModalId)
        }}
      />
      <DropPicker
        title={'Profile Picture Selection :'}
        isLoading={isOverlayVisible}
        onPressCamera={() => getImageById(1)}
        onPressGallery={() => getImageById(2)}
        onClose={() => {
          setOverlayVisible(false)
          setShowMenu(!showMenu);
        }}
      />
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
    height: 35,
    width: 35,
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
    paddingVertical: 8,
  },
  imageItem: {
    height: 30,
    width: 30,
  },
  textItem: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  viewDivider: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
});

export default HomeScreen;