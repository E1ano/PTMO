import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../interfaces/user.interface';

interface IState {
  user: IUser | null;
  users: IUser[] | null;
}
const initialState: IState = {
  user: null,
  users: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state: IState, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setUsers: (state: IState, action: PayloadAction<IUser[] | null>) => {
      state.users = action.payload;
    },
  },
});

const {actions, reducer: authReducer} = authSlice;
const authActions = {
  ...actions,
};
export {authActions, authReducer};
