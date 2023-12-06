import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAllPeople, ILikedPeople} from '../../interfaces/people.interface';

interface IState {
  allPeople: IAllPeople;
  likedPeople: ILikedPeople[];
}
const initialState: IState = {
  allPeople: {
    people: [],
    totalCount: 0,
    pageInfo: {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '',
    },
  },
  likedPeople: [],
};

const slice = createSlice({
  name: 'peopleSlice',
  initialState,
  reducers: {
    setAllPeople: (state: IState, action: PayloadAction<IAllPeople>) => {
      state.allPeople = action.payload;
    },
    setLikedPeople: (state, action: PayloadAction<ILikedPeople>) => {
      const person = action.payload;
      const index = state.likedPeople.findIndex(p => p.id === person.id);
      if (index !== -1) {
        state.likedPeople = state.likedPeople.filter(p => p.id !== person.id);
      } else {
        state.likedPeople = [...state.likedPeople, person];
      }
    },
    setLikedArr: (state, action: PayloadAction<ILikedPeople[]>) => {
      state.likedPeople = action.payload;
    },
  },
});

const {actions, reducer: peopleReducer} = slice;
const peopleActions = {
  ...actions,
};
export {peopleActions, peopleReducer};
