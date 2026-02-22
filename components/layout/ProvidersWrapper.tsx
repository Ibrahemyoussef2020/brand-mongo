'use client'

import {store,persistor} from '../../redux/store';
import { Provider } from "react-redux";
import { ChildrenProps } from '@/types';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";
import { LangProvider } from '@/context/LangContext';
import SessionSync from './SessionSync';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProvidersWrapper = ({children, locale}:ChildrenProps) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <SessionSync />
        <PersistGate persistor={persistor}>
          <LangProvider initialLocale={locale || 'en'}>
            <ToastContainer />
            {children}
          </LangProvider>
        </PersistGate>
      </SessionProvider>
    </Provider>
  )
}

export default ProvidersWrapper