'use client'

import {store,persistor} from '../../redux/store';
import { Provider } from "react-redux";
import { ChildrenProps } from '@/types';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";
import { LangProvider } from '@/context/LangContext';

const ProvidersWrapper = ({children, locale}:ChildrenProps) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <PersistGate persistor={persistor}>
          <LangProvider initialLocale={locale || 'en'}>
            {children}
          </LangProvider>
        </PersistGate>
      </SessionProvider>
    </Provider>
  )
}

export default ProvidersWrapper