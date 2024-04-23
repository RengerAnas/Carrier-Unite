import {useDispatch} from 'react-redux';
import {store} from '../Store/Store';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
