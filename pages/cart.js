import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import { reset } from '../redux/cartSlice';
import styles from '../styles/Cart.module.css';

export default function Cart() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  const amount = cart.total;
  const currency = 'HKD';
  const style = { layout: 'vertical' };

  function displayExtras(product) {
    if (product.extras.length === 1) {
      return <span>{product.extras[0].text}</span>;
    } else {
      return product.extras.map((option) => (
        <span key={option._id}>{option.text}, </span>
      ));
    }
  }

  async function createOrder(data) {
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const order = await res.json();

      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${order._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr key={product._id} className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.image}
                      alt=''
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td className={styles.extras}>
                  <span>{displayExtras(product)}</span>
                </td>
                <td>
                  <span className={styles.price}>{product.itemPrice}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.itemPrice * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>

          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>Cash on Delivery</button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'Acu7T-B1-cjooMujQvw2m3bx2nCvtREktKeXSCnSPDvdVvzmxP2C7eO6-dd_Lwxq28onXHNwbpSvV5Kk',
                  components: 'buttons',
                  currency: 'HKD',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
