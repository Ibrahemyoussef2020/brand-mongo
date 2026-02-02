'use client'

import {store,persistor} from '../../redux/store';
import { Provider } from "react-redux";
import { ChildrenProps } from '@/types';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";

const ProvidersWrapper = ({children}:ChildrenProps) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      </SessionProvider>
    </Provider>
  )
}

export default ProvidersWrapper