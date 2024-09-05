import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {RootStackParamList} from './navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppSelector} from '../redux/hook/hook';

type HeaderProp = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Header = ({navigation}: HeaderProp) => {
  const {loading} = useAppSelector(state => state.crime);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Home</Text>
      <Icon
        name="chart-line"
        size={20}
        color="#fff"
        style={styles.iconStyle}
        disabled={loading}
        onPress={() => navigation.navigate('Chart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'darkcyan',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  iconStyle: {
    padding: 10,
    borderRadius: 10,
  },
});

export default Header;
