'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { createOrder, fetchOrders } from '@/redux/slices';
import { AppDispatch } from '@/redux/store';

interface Props {
    children: React.ReactNode;
}

const OrdersPageClient = ({ children }: Props) => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const paymentIntent = searchParams.get('payment_intent');
        const redirectStatus = searchParams.get('redirect_status');

        if (paymentIntent && redirectStatus === 'succeeded') {
            setOrderStatus('processing');
            setMessage('Processing your order...');

            dispatch(createOrder(paymentIntent))
                .unwrap()
                .then((result) => {
                    setOrderStatus('success');
                    setMessage('Payment successful! Your order has been placed.');
                    dispatch(fetchOrders());
                })
                .catch((error) => {
                    console.error('Error creating order:', error);
                    if (error.message?.includes('already exists')) {
                        setOrderStatus('success');
                        setMessage('Order already processed.');
                    } else {
                        setOrderStatus('error');
                        setMessage('There was an issue processing your order. Please contact support.');
                    }
                    dispatch(fetchOrders());
                });
        } else {
            dispatch(fetchOrders());
        }
    }, [searchParams, dispatch]);

    return (
        <>
            {orderStatus !== 'idle' && (
                <div className={`order-status-banner ${orderStatus}`}>
                    {orderStatus === 'processing' && (
                        <div className="processing">
                            <span className="spinner"></span>
                            {message}
                        </div>
                    )}
                    {orderStatus === 'success' && (
                        <div className="success">
                            ✅ {message}
                        </div>
                    )}
                    {orderStatus === 'error' && (
                        <div className="error">
                            ⚠️ {message}
                        </div>
                    )}
                </div>
            )}
            {children}
        </>
    );
};

export default OrdersPageClient;
