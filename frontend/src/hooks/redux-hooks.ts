import { Dispatch } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';

export const useAppDispatch: () => Dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
