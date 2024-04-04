import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {Overlay} from '@rneui/themed';

const DropPicker = (props) => {
  return (
    <Overlay
      isVisible={props.isLoading}
      onBackdropPress={console.log}
      overlayStyle={styles.viewOverlay}>
      <View style={styles.viewLoader}>
        <Text style={styles.textTitle}>{'Choose Option'}</Text>
        <View style={styles.viewDivider} />
        <TouchableOpacity onPress={props.onPressCamera}>
          <Text style={styles.textItems}>{'Camera'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPressGallery}>
          <Text style={styles.textItems}>{'Gallery'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onClose}>
          <Text style={styles.textItems}>{'Close'}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

const {width} = Dimensions.get('window');
const cardWidth = width - 40;

const styles = StyleSheet.create({
  viewOverlay: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    shadowColor:'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    width: cardWidth,
    paddingHorizontal: 20,
  },
  viewLoader: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textTitle: {
    color: '#000',
    fontSize: 15,
    marginVertical: 10,
  },
  viewDivider: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 8,
    marginTop: 3,
  },
  textItems: {
    color: '#000',
    fontSize: 13,
    marginVertical: 2,
    paddingVertical: 5,
  },

});

export default DropPicker;
