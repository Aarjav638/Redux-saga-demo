import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text style={styles.splashText}>Splash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkcyan',
  },
});

export default Splash;
