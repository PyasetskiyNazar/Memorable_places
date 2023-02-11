import { CREATE, DELETE, LIKE, FETCH_ALL, UPDATE, FETCH_BY_SEARCH, FETCH_POST, COMMENT_POST, START_LOADING, END_LOADING } from '../constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_POST:
      return { ...state, post: action.payload }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        })
      }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data }
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
    default:
      return state
  }
}

