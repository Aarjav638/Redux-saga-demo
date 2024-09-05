import React from 'react';
import FlatListSearch from '../components/FlatListSearch';
import Header from '../components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigator';

import {SafeAreaView} from 'react-native-safe-area-context';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const Home: React.FC<HomeProps> = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      <FlatListSearch />
    </SafeAreaView>
  );
};

export default Home;
