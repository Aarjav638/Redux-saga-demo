import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from '../redux/hook/hook';
import CrimeAnalytics from '../components/CrimeAnalytics';
import Icon from 'react-native-vector-icons/FontAwesome6';
type ChartProp = NativeStackScreenProps<RootStackParamList, 'Chart'>;

const Chart = ({route, navigation}: ChartProp) => {
  const {data, loading, error} = useAppSelector(state => state.crime);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          Crime Analytics
        </Text>
      </View>
      {loading && <ActivityIndicator size={'large'} color={'#000'} />}
      {error && <Text>Error: {error}</Text>}

      {data && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <CrimeAnalytics crimeData={data} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    backgroundColor: 'darkcyan',
  },
});
export default Chart;
