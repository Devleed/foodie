import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const TopNav = () => {
  return (
    <View style={styles.topNav}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.profileImage}
      />
      <EvilIcon name="navicon" style={styles.navIcon} />
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10 + StatusBar.currentHeight,
    elevation: 7,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  navIcon: {
    fontSize: 25,
    color: '#535353',
  },
});
