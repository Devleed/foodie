import React from 'react';
import { StatusBar, StyleSheet, View, ScrollView } from 'react-native';
import TopNav from '../components/TopNav';
import { Spacer, Text, TextInput } from '../native components';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import CategoryCard from '../components/CategoryCard';
import { FlatList } from 'react-native-gesture-handler';
import PopularCard from '../components/PopularCard';
import { SvgCss } from 'react-native-svg';
import xml from '../assets/waveSvg';

const categories = [
  { title: 'pizza', icon: 'pizza-outline' },
  { title: 'drink', icon: 'pizza-outline' },
  { title: 'wine', icon: 'pizza-outline' },
  { title: 'ice-cream', icon: 'pizza-outline' },
];

const popularItems = [
  {
    id: 0,
    title: 'Permosian Pizza',
    image: require('../assets/pizza2.jpg'),
    price: 5.99,
    stats: [
      { title: 'size', value: 'Medium 16"' },
      { title: 'crust', value: 'thin crust"' },
      { title: 'time', value: '30 min"' },
    ],
  },
  {
    id: 1,
    title: 'Pepporoni Pizza',
    image: require('../assets/pizza2.jpg'),
    price: 5.99,
    stats: [
      { title: 'size', value: 'Medium 16"' },
      { title: 'crust', value: 'thin crust"' },
      { title: 'time', value: '30 min"' },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <TopNav />
      <ScrollView style={styles.container}>
        <SvgCss
          xml={xml}
          style={{
            position: 'absolute',
            top: -10,
            left: 0,
            // zIndex: 9,
            right: 0,
          }}
          height={100}
        />
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.contentContainer}>
          <Spacer horizontal={20}>
            <Text color="#535353" h6 style={{ lineHeight: 30 }}>
              Welcome to
            </Text>
            <Text
              color="#535353"
              h1
              bold
              transform="uppercase"
              style={{ lineHeight: 40 }}>
              Foodie
            </Text>
            <TextInput
              bottomBordered
              style={styles.searchInput}
              placeholder="search"
              icon={<EvilIcon name="search" size={20} />}
            />
          </Spacer>
          <Spacer vertical={20}>
            <Spacer left={20} bottom={10}>
              <Text h5 bold color="#535353">
                Categories
              </Text>
            </Spacer>
            <FlatList
              data={categories}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Spacer
                    horizontal={5}
                    left={index === 0 ? 20 : 0}
                    right={index === categories.length - 1 ? 20 : 0}>
                    <CategoryCard {...item} />
                  </Spacer>
                );
              }}
            />
          </Spacer>
          <Spacer around={20}>
            <Text h5 bold color="#535353">
              Popular
            </Text>
            <Spacer top={10} />
            <PopularCard navigation={navigation} item={popularItems[0]} />
            <Spacer top={30} />
            <PopularCard navigation={navigation} item={popularItems[1]} />
          </Spacer>
        </View>
        <Spacer bottom={80} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderColor: '#d8d8d8',
    fontSize: 14,
  },
});
