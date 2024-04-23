import {rootReducerType} from './../Store/rootReducer';
import {useSelector} from 'react-redux';

export const useGetStore = () => {
  return useSelector<rootReducerType, rootReducerType>(state => state);
};
