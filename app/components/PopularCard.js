import React, { useRef, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

import { primaryColor } from '../colors';

import { Spacer, Text, Button } from '../native components';

const PopularCard = ({ item, navigation }) => {
  const translateX = useRef(new Animated.Value(600)).current;
  const textTranslateX = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.parallel([
        Animated.spring(btnScale, {
          toValue: 1,
          delay: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(textTranslateX, {
          toValue: 0,
          delay: 1200,
          useNativeDriver: true,
        }),
      ]).start();
    }, []),
  );

  Animated.timing(translateX, {
    toValue: 0,
    duration: 1000,
    delay: 200,
    useNativeDriver: true,
  }).start();

  const rotate = translateX.interpolate({
    inputRange: [0, 100, 200, 400],
    outputRange: ['0deg', '40deg', '80deg', '100deg'],
  });

  const showDetails = () => {
    Animated.parallel([
      Animated.spring(btnScale, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateX, {
        toValue: -200,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('detail', { item });
    });
  };

  return (
    <View>
      <SharedElement id={`item.${item.id}`}>
        <TouchableOpacity
          style={styles.popularCard}
          onPress={showDetails}
          activeOpacity={0.9}>
          <View>
            <Animated.View
              style={[
                styles.cardContent,
                { transform: [{ translateX: textTranslateX }] },
              ]}>
              <View style={styles.categoryAlert}>
                <AntDesign name="star" color={primaryColor} />
                <Spacer right={10} />
                <Text size={13}>hit of the week</Text>
              </View>
              <Text h5 color="#535353" bold>
                {item.title}
              </Text>
              <Text size={13} color="#d8d8d8">
                loren ipsum
              </Text>
            </Animated.View>
            <Animated.View
              style={[styles.addBtn, { transform: [{ scale: btnScale }] }]}>
              <Button
                icon={<AntDesign name="plus" color="#535353" size={16} />}
                mainColor={primaryColor}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </SharedElement>
      <SharedElement id={`item.${item.id}.photo`}>
        <Animated.Image
          source={item.image}
          style={[styles.image, { transform: [{ translateX }, { rotate }] }]}
        />
      </SharedElement>
    </View>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  popularCard: {
    height: 160,
    width: '100%',
    position: 'relative',
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: '#d8d8d8',
    flexDirection: 'row',
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
  },
  categoryAlert: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    height: 158,
    padding: 20,
    width: 185,
    borderRadius: 20,
  },
  image: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
    position: 'absolute',
    top: -180,
    right: -10,
  },
  addBtn: {
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryColor,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
  },
});
