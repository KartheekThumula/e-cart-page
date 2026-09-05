import {useState, useContext} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const Payment = () => {
  const {cartList} = useContext(CartContext)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const updatePaymentMethod = event => {
    setPaymentMethod(event.target.value)
  }

  const onConfirmOrder = () => {
    setIsOrderPlaced(true)
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="checkout-btn">
          Checkout
        </button>
      }
      position="center center"
    >
      {close => (
        <div className="payment-modal-container">
          {isOrderPlaced ? (
            <div className="payment-success-view">
              <p className="success-message">
                Your order has been placed successfully
              </p>
              <button
                type="button"
                className="close-popup-btn"
                onClick={() => close()}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="payment-content-view">
              <h1 className="payment-title">Payment Details</h1>
              <p className="payment-sub-title">Payment Method</p>

              <ul className="payment-options-list">
                {paymentOptionsList.map(each => (
                  <li key={each.id} className="payment-option-item">
                    <input
                      type="radio"
                      id={each.id}
                      name="paymentOption"
                      value={each.id}
                      disabled={each.isDisabled}
                      onChange={updatePaymentMethod}
                    />
                    <label
                      htmlFor={each.id}
                      className={
                        each.isDisabled ? 'label-disabled' : 'label-active'
                      }
                    >
                      {each.displayText}
                    </label>
                  </li>
                ))}
              </ul>

              <div className="order-summary-box">
                <p className="summary-heading">Order details:</p>
                <p className="summary-item">
                  Quantity: <span className="summary-value">{totalItems}</span>
                </p>
                <p className="summary-item">
                  Total Price:{' '}
                  <span className="summary-value">Rs {totalPrice}/-</span>
                </p>
              </div>

              <button
                type="button"
                className="confirm-order-btn"
                disabled={paymentMethod !== 'CASH ON DELIVERY'}
                onClick={onConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}
    </Popup>
  )
}

export default Payment
