'use client'

import {store,persistor} from '../../redux/store';
import { Provider } from "react-redux";
import { ChildrenProps } from '@/types';
import { PersistGate } from 'redux-persist/integration/react';

const ProvidersWrapper = ({children}:ChildrenProps) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
    </Provider>
  )
}

export default ProvidersWrapper