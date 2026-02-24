'use client';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

// Initialize Stripe outside of component to avoid recreating checking on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { translate } = useLang();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return (<div>{translate(dictionaries.cart.stripeLoadingError)}</div>);
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/orders`, 
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || translate(dictionaries.cart.unexpectedError));
        } else {
            setMessage(translate(dictionaries.cart.unexpectedError));
        }

        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="stripe-form"> 
            <PaymentElement id="payment-element" options={{layout: "tabs"}} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="stripe-button">
                <span id="button-text">
                    {isLoading ? translate(dictionaries.cart.processing) : translate(dictionaries.cart.payNow)}
                </span>
            </button>
            {message && <div id="payment-message" className="stripe-error">{message}</div>}
        </form>
    )
}

import StripeSkelton from "@/skelton/orders/StripeSkelton";


const Stripe = () => {
    const { translate } = useLang();
    const [clientSecret, setClientSecret] = useState("");
    const { products, bill } = useSelector((state: IRootState) => state.combine.cart);
    const router = useRouter();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if(bill > 0){
             axios.post("/api/create-payment-intent", { items: products, amount: bill })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    router.push("/login");
                }
                console.error("Error creating payment intent", err);
            });
        }
    }, [bill, products, router]);

    const appearance = {
        theme: 'stripe' as const,
    };
    
    const options = {
        clientSecret,
        appearance,
    };

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return <div className="error">{translate(dictionaries.cart.stripeKeyMissing)}</div>;
    }

    if (!bill) {
        return <div>{translate(dictionaries.cart.emptyCartError)}</div>;
    }

    return (
        <div className="stripe-container">
             {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <StripeSkelton />
            )}
        </div>
    );
}

export default Stripe;
