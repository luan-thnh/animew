export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  fullName?: string;
  level?: number;
  description?: string;
  address?: string;
  age?: number;
}

export interface IComment {
  _id: string;
  content: string;
  createdAt: Date;
}

export interface IState {
  user: IUser | null;
  comments: IComment[];
}

export interface IAction {
  type: string;
  payload?: any;
}

export const initialState: IState = {
  user: null,
  comments: [],
};

const reducer = (state: IState = initialState, { type, payload }: IAction): IState => {
  switch (type) {
    case 'CURRENT_USER': {
      return { ...state, user: payload };
    }

    case 'GET_ALL_COMMENT': {
      return { ...state, comments: payload };
    }

    case 'POST_COMMENT': {
      return { ...state, comments: [...state.comments, payload] };
    }

    case 'UPDATE_COMMENT': {
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === payload._id) {
          return { ...comment, ...payload };
        }
        return comment;
      });
      return { ...state, comments: updatedComments };
    }

    case 'REMOVE_COMMENT': {
      const filteredComments = state.comments.filter((comment) => comment._id !== payload._id);
      return { ...state, comments: filteredComments };
    }
    default:
      return state;
  }
};

export default reducer;
