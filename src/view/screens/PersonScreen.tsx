import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigation';
import PeopleItem from '../components/PeopleItem';
import GoBackBtn from '../components/GoBackBtn';

interface IProps {
  route: RouteProp<RootStackParamList, 'PersonScreen'>;
}
const PersonScreen: FC<IProps> = ({route}) => {
  const {people} = route.params;

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <GoBackBtn />
          <Text style={styles.topName}>{people.name}</Text>
        </View>
        <View>
          <PeopleItem people={people} moreInfo={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 6,
    paddingHorizontal: 16,
  },
  topBar: {
    marginBottom: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topName: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 1.03,
    color: '#2f2f2f',
  },
});

export default PersonScreen;
