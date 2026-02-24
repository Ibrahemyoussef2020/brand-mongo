'use client'
import { useLang } from '@/context/LangContext'
import { dictionaries } from '@/lib/dictionaries'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSubscriberStatus } from '@/redux/slices'

const Subscribe = () => {
    const { lang, translate } = useLang();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '' });

        try {
            const response = await axios.post('/api/subscribe', { email });
            if (response.status === 201) {
                setStatus({ loading: false, success: true, error: '' });
                setEmail('');
                dispatch(setSubscriberStatus(true));
            }
        } catch (error: any) {
            console.error('Subscription error:', error);
            let errorMessage = translate(dictionaries.newsletter.errorMsg);
            
            if (error.response?.status === 409) {
                errorMessage = translate(dictionaries.newsletter.duplicateEmail);
            } else if (error.response?.status === 400) {
                errorMessage = translate(dictionaries.newsletter.invalidEmail);
            }

            setStatus({
                loading: false,
                success: false,
                error: errorMessage,
            });
        }
    };

    return (
        <section className='subscribe'>
            <h2>{translate(dictionaries.newsletter.heading)}</h2>
            <p>
                {translate(dictionaries.newsletter.subheading)}
            </p>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <Image
                        src='/images/icons/email.png'
                        alt='mail'
                        width={21}
                        height={17}
                    />
                    <input
                        type="email"
                        placeholder={translate(dictionaries.newsletter.placeholder)}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={status.loading}>
                    {status.loading ? translate(dictionaries.messagePage.sending) : translate(dictionaries.newsletter.button)}
                </button>
            </form>
            {status.success && (
                <p className="status-msg success" style={{ color: '#00b517', marginTop: '10px' }}>
                    {translate(dictionaries.newsletter.successMsg)}
                </p>
            )}
            {status.error && (
                <p className="status-msg error" style={{ color: '#fa3434', marginTop: '10px' }}>
                    {status.error}
                </p>
            )}
        </section>
    )
}

export default Subscribe
