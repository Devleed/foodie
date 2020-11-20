import React, { useCallback, useEffect, useRef } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Animated,
  StatusBar,
  BackHandler,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';

import { primaryColor } from '../colors';

import { Spacer, Text, Button } from '../native components';

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const itemInfoTranslates = [
    useRef(new Animated.Value(-200)).current,
    useRef(new Animated.Value(-100)).current,
    useRef(new Animated.Value(-300)).current,
  ];
  const btnScale = useRef(new Animated.Value(0)).current;

  const useAnimatedTiming = (value, toValue, duration, delay) => {
    return Animated.timing(value, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);

    return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
  }, []);

  useFocusEffect(
    useCallback(() => {
      Animated.parallel([
        useAnimatedTiming(itemInfoTranslates[0], 0, 900, 600),
        useAnimatedTiming(itemInfoTranslates[1], 0, 900, 900),
        useAnimatedTiming(itemInfoTranslates[2], 0, 900, 1100),
        Animated.spring(btnScale, {
          toValue: 1,
          delay: 900,
          useNativeDriver: true,
        }),
      ]).start();
    }, []),
  );

  const goBack = () => {
    Animated.parallel([
      useAnimatedTiming(itemInfoTranslates[0], -200, 900, 600),
      useAnimatedTiming(itemInfoTranslates[1], -100, 900, 900),
      useAnimatedTiming(itemInfoTranslates[2], -300, 900, 1100),
      Animated.spring(btnScale, {
        toValue: 0,
        delay: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
    return true;
  };

  return (
    <View style={styles.container}>
      <SharedElement id={`item.${item.id}`}>
        <View style={styles.categoryContainer}>
          <View style={styles.detailHeader}>
            <Button
              icon={
                <MaterialIcon name="arrow-back-ios" color="#d8d8d8" size={20} />
              }
              mainColor="white"
              style={styles.btn}
              onPress={goBack}
            />
            <Button
              icon={<MaterialIcon name="star" color="white" size={20} />}
              style={[
                styles.btn,
                { backgroundColor: primaryColor, borderWidth: 0 },
              ]}
            />
          </View>

          <Spacer left={20} style={{ height: '100%' }}>
            <Animated.Text
              style={[
                styles.itemTitle,
                { transform: [{ translateX: itemInfoTranslates[0] }] },
              ]}>
              {item.title}
            </Animated.Text>
            <Animated.View
              top={10}
              style={[
                styles.itemPrice,
                { transform: [{ translateX: itemInfoTranslates[1] }] },
              ]}>
              <Text size={13} color="orange">
                $
              </Text>
              <Text h1 bold color="orange">
                {item.price}
              </Text>
            </Animated.View>
            <Spacer vertical={30}>
              {item.stats.map((stat, i) => (
                <ItemStat
                  animatedValue={itemInfoTranslates[2]}
                  stat={stat}
                  key={i}
                />
              ))}
            </Spacer>

            <Animated.View
              style={[
                styles.addBtnContainer,
                { transform: [{ scale: btnScale }] },
              ]}>
              <Button
                icon={<AntDesign name="plus" color="#535353" size={16} />}
                mainColor={primaryColor}
                btnStyle={styles.addBtn}
              />
            </Animated.View>
          </Spacer>
        </View>
      </SharedElement>
      <SharedElement id={`item.${item.id}.photo`} style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </SharedElement>
    </View>
  );
};

const ItemStat = ({ animatedValue, stat }) => {
  return (
    <Animated.View
      style={[styles.itemStat, { transform: [{ translateX: animatedValue }] }]}>
      <Text size={14} color="#d8d8d8" style={styles.itemStatType}>
        {stat.title}
      </Text>
      <Text h5 color="#535353">
        {stat.value}
      </Text>
    </Animated.View>
  );
};

DetailsScreen.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;

  return [`item.${item.id}`, `item.${item.id}.photo`];
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  categoryContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardContent: {
    height: 158,
    padding: 20,
    width: 185,
  },
  imageContainer: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 200,
    right: -110,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 10,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailHeader: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemStatType: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#d8d8d8',
  },
  addBtnContainer: {
    height: 50,
    width: 320,
    position: 'absolute',
    bottom: 80,
    overflow: 'hidden',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  addBtn: {
    width: '100%',
    height: '100%',
  },
  itemTitle: {
    fontSize: 30,
    width: 150,
    color: '#535353',
    fontWeight: 'bold',
  },
  itemStat: {
    marginVertical: 20,
  },
});
