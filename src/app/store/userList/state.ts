import { User } from '../../user';

export interface UserListFilter {
  nameFilter: string;
}

export interface State {
  userList: {
    items: User[];
    filter: UserListFilter;
  };
}

// stateの初期値
export const initialState = {
  userList: {
    items: [],
    filter: {
      nameFilter: '',
    },
  },
};
