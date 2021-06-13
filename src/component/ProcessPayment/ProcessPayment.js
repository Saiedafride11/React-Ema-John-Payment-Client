import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
// import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51J1Q07LttzxdmHVsr6NyFiVhCBLRcQbuYOknMDeocMzo3fmBpumxxUkqwZ233UBdC0gom9oe4fMONT4IsLaBWRZa00oeAaYtZ0');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           
           <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
           {/* <SplitCardForm></SplitCardForm> */}
           
        </Elements>
    );
};

export default ProcessPayment;