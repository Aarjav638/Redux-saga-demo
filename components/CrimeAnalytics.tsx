import React, {useEffect, useMemo, useState} from 'react';
import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import {Crime} from '../redux/constants/types';

const CrimeAnalytics = ({crimeData}: {crimeData: Crime[]}) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({window}: {window: any}) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const crimeCounts = useMemo(() => {
    return crimeData.reduce((acc, item) => {
      const crimeType = item.primary_type;
      acc[crimeType] = (acc[crimeType] || 0) + 1;
      return acc;
    }, {} as {[key: string]: number});
  }, [crimeData]);

  const categories = useMemo(() => Object.keys(crimeCounts), [crimeCounts]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredCrimeData = useMemo(() => {
    return crimeData.filter(item => item.primary_type === selectedCategory);
  }, [crimeData, selectedCategory]);

  const monthCounts = useMemo(() => {
    return filteredCrimeData.reduce((acc: {[key: string]: number}, item) => {
      const month = moment(item.date).format('YYYY-MM');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
  }, [filteredCrimeData]);

  const months = useMemo(() => Object.keys(monthCounts).sort(), [monthCounts]);

  const data = useMemo(
    () => months.map(month => monthCounts[month]),
    [months, monthCounts],
  );
  const lineChartData = useMemo(() => {
    return data.map(count => ({
      value: count,
    }));
  }, [data]);
  const pieChartData = useMemo(() => {
    return categories.map((category, index) => ({
      value: crimeCounts[category],
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
    }));
  }, [categories, crimeCounts]);

  const barChartData = useMemo(() => {
    return categories.map(category => ({
      value: crimeCounts[category],
      label: category,
    }));
  }, [categories, crimeCounts]);

  const maxValue = useMemo(
    () => Math.max(...barChartData.map(item => item.value)),
    [barChartData],
  );

  const noOfSections = useMemo(
    () => Math.min(Math.ceil(maxValue / 10), 10),
    [maxValue],
  );

  return (
    <View>
      <Text style={styles.pickerText}>
        Showing Category Wise Crime Frequencies
      </Text>
      <BarChart
        data={barChartData}
        barWidth={30}
        barBorderRadius={4}
        width={dimensions.width * 0.9}
        height={300}
        focusBarOnPress
        showLine
        lineConfig={{
          color: 'darkcyan',
          thickness: 2,
        }}
        focusedBarConfig={{
          color: 'darkcyan',
        }}
        noOfSections={noOfSections}
        yAxisTextStyle={{color: 'black', fontSize: 10}}
        xAxisLabelTextStyle={{color: 'black', fontSize: 10}}
        isAnimated
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          borderRadius: 10,
          elevation: 10,
          margin: 20,
          padding: 10,
        }}>
        <PieChart
          textColor="black"
          radius={150}
          textSize={20}
          data={pieChartData}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          {categories.map((category, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
                marginVertical: 5,
                marginHorizontal: 15,
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: pieChartData[index].color,
                  marginRight: 5,
                }}
              />
              {/* Crime Category and Count */}
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                {category}: {crimeCounts[category]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.pickerText}>Select Crime Category:</Text>
      <Picker
        style={{
          height: 50,
          width: '80%',
          alignSelf: 'center',
          color: 'white',
          backgroundColor: 'darkcyan',
        }}
        itemStyle={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
        dropdownIconColor={'white'}
        dropdownIconRippleColor={'white'}
        selectedValue={selectedCategory}
        onValueChange={itemValue => setSelectedCategory(itemValue)}>
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <View
        style={{
          marginBottom: 30,
          padding: 20,
          backgroundColor: 'darkcyan',
          margin: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LineChart
          data={lineChartData}
          xAxisLabelTexts={months}
          xAxisLabelTextStyle={{color: '#f0f0f0'}}
          width={dimensions.width * 0.7}
          hideRules
          dataPointsColor1="#fff"
          yAxisColor="#0BA5A4"
          xAxisColor="#0BA5A4"
          color="#0BA5A4"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 30,
  },
});

export default CrimeAnalytics;
