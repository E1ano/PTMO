import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {peopleActions} from '../../redux/slices/people.slice';
import {useNavigation} from '@react-navigation/native';
import LikeIcon from '../../assets/icons/LikeIcon';
import {IPerson} from '../../interfaces/people.interface';
import PeopleTextBlock from './PeopleTextBlock';

interface IProps {
  people: IPerson;
  moreInfo?: boolean;
}
const PeopleItem: FC<IProps> = ({people, moreInfo}) => {
  const {
    name,
    gender,
    birthYear,
    homeworld,
    species,
    id,
    height,
    mass,
    eyeColor,
    skinColor,
    hairColor,
  } = people;
  const [liked, setLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const likedPeople = useAppSelector(state => state.people.likedPeople);
  const navigation = useNavigation();

  const likePressHandle = () => {
    setLiked(prevState => !prevState);
    dispatch(peopleActions.setLikedPeople({id, gender}));
  };

  useEffect(() => {
    const isLiked = likedPeople?.find(item => item.id === id);
    setLiked(!!isLiked);
  }, [id, likedPeople]);
  return (
    <View style={styles.container}>
      {!moreInfo ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PersonScreen' as never, {people} as never)
          }>
          <PeopleTextBlock title="Name:" value={name} />
          <PeopleTextBlock title="Birth year:" value={birthYear} />
          <PeopleTextBlock title="Gender:" value={gender} />
          <PeopleTextBlock title="Home world:" value={homeworld?.name} />
          <PeopleTextBlock title="Species:" value={species?.name || '–'} />
        </TouchableOpacity>
      ) : (
        <View>
          <PeopleTextBlock title="Name:" value={name} />
          <PeopleTextBlock title="Birth year:" value={birthYear} />
          <PeopleTextBlock title="Gender:" value={gender} />
          <PeopleTextBlock title="Home world:" value={homeworld?.name} />
          <PeopleTextBlock title="Species:" value={species?.name || '–'} />
          <PeopleTextBlock title="Eye color:" value={eyeColor} />
          <PeopleTextBlock title="Height:" value={height} />
          <PeopleTextBlock title="Mass:" value={mass} />
          <PeopleTextBlock title="Skin color:" value={skinColor} />
          <PeopleTextBlock title="Hair color:" value={hairColor} />
        </View>
      )}
      <TouchableOpacity onPress={likePressHandle}>
        <View style={styles.like}>
          <LikeIcon
            fill={liked ? 'red' : 'none'}
            stroke={liked ? 'red' : 'black'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 1,
  },
  like: {
    transform: 'scale(0.85)',
  },
});

export default PeopleItem;
