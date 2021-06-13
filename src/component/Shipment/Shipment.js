import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [shippingData, setShippingData] = useState(null)

  const onSubmit = data => {
    setShippingData(data)
  };

  const handlePaymentSuccess = (paymentId) => {
     // console.log('Form Submitted', data);
     const savedCart = getDatabaseCart();
     const orderDetails = {
        ...loggedInUser,
        products: savedCart,
        shipments:shippingData,
        paymentId,
        orderTime: new Date()
      }
 
     fetch('https://damp-plains-27283.herokuapp.com/addOrder', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(orderDetails)
     })
     .then(res => res.json())
     .then(data => {
       if(data){
         processOrder()
         alert('Your Orders Succesfully')
       }
     })
  }

  console.log(watch("example"));
  return (
    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block' }} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          
          <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Plese Enter Your Name"/>
          {errors.name && <span className="error">Name is required</span>}

          <input name="email"  defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Plese Enter Your Email"/>
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" {...register("address", { required: true })}placeholder="Plese Enter Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input name="phone" {...register("phone", { required: true })} placeholder="Plese Enter Your Phone"/>
          {errors.phone && <span className="error">Phone is required</span>}
          
          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none' }} className="col-md-6">
          <h1>Plese Pay For me</h1>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;