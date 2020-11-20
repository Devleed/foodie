import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Text } from '../native components';
import { primaryColor } from '../colors';

const CategoryCard = (props) => {
  return (
    <View style={styles.item}>
      <Ionicon
        name="pizza-outline"
        color="#fff"
        size={80}
        style={styles.icon}
      />
      <Text h6 color="#535353">
        {props.title}
      </Text>
      <TouchableOpacity>
        <Ionicon
          name="md-caret-back-circle-outline"
          color="#535353"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: primaryColor,
    height: 200,
    width: 140,
    elevation: 7,
  },
  icon: {
    transform: [{ rotate: '40deg' }],
  },
});
