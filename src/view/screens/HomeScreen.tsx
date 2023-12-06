import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {peopleActions} from '../../redux/slices/people.slice';
import PeopleItem from '../components/PeopleItem';
import {useQuery} from '@apollo/client';
import {GetAllPeople} from '../../graphql/queries';
import CountersBar from '../components/CountersBar';
import Error from '../components/Error';
import Loader from '../components/Loader';
import CustomInput from '../components/CustomInput';
import Pagination from '../components/Pagination';
import {IPerson} from '../../interfaces/people.interface';
import {
  fetchDataFromAsyncStorage,
  storeDataToAsyncStorage,
} from '../../utilities/commonFunctions';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const allPeople = useAppSelector(state => state.people.allPeople);
  const likedPeople = useAppSelector(state => state.people.likedPeople);

  const [afterArr, setAfterArr] = useState<string[]>(['']);
  const [after, setAfter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IPerson[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {data, loading, error} = useQuery(GetAllPeople, {
    variables: {after},
  });

  const pageAmount = useMemo(
    () => Math.ceil(allPeople?.totalCount / 10),
    [allPeople?.totalCount],
  );

  const nextClickHandler = () => {
    if (afterArr.length <= pageAmount) {
      setAfter(allPeople?.pageInfo?.endCursor);
    }
    if (!loading && pageNumber < pageAmount) {
      setPageNumber(prevState => prevState + 1);
    }
  };

  const prevClickHandler = () => {
    if (afterArr.length > 2) {
      const mutedArray = afterArr.slice(0, -2);
      setAfterArr(mutedArray);
      setAfter(afterArr[mutedArray.length - 1]);
    }
    if (!loading && pageNumber > 1) {
      setPageNumber(prevState => prevState - 1);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(peopleActions.setAllPeople(data.allPeople));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (allPeople?.pageInfo?.endCursor) {
      setAfterArr(prevState => [...prevState, allPeople?.pageInfo?.endCursor]);
    }
    setFilteredData(allPeople.people);
  }, [allPeople]);

  useEffect(() => {
    const fetchData = async () => {
      const likedData = await fetchDataFromAsyncStorage('likedPeople');
      dispatch(peopleActions.setLikedArr(likedData));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const saveData = async () => {
      await storeDataToAsyncStorage('likedPeople', likedPeople);
    };
    saveData();
  }, [likedPeople]);

  const onInputChange = (search: string) => {
    const filteredArr: IPerson[] = allPeople.people.filter((item: IPerson) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(filteredArr);
  };

  if (error) {
    return <Error />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CountersBar />
        <CustomInput placeholder="Search" changeTextHandler={onInputChange} />
        {loading ? (
          <Loader />
        ) : (
          allPeople && (
            <FlatList
              data={filteredData}
              renderItem={({item}) => <PeopleItem people={item} />}
            />
          )
        )}
        <Pagination
          prevDisabled={pageNumber <= 1}
          nextDisabled={pageNumber >= pageAmount}
          currPage={pageNumber}
          pageAmount={pageAmount}
          goPrev={prevClickHandler}
          goNext={nextClickHandler}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    marginTop: 6,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
