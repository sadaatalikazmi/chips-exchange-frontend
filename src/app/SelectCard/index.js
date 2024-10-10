import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import './index.css';
import '../../static/css/animate.css';
import 'animate.css';
import Sidebar from '../../components/sidebar';
import NavbarInner from '../../components/navbar-inner';
import { purchaseChips, refundChips, getUserCards } from '../../store/actions/Auth';

const stripePromise = loadStripe('pk_test_51ORwB1EwaCzpwm3NQ26pjRkQVPdNJp0PWnZd6fJtelt6npSl1FYHYkOJkAE9nLedyxXrE6hJDgeQGhh53d8aI57900X01NVPYg');

const CheckoutForm = ({ history, transactionMode, cardId, cardExistence, amount, refundType }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    let paymentMethodId, cardType;

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (paymentMethod && !cardId) {
      paymentMethodId = paymentMethod.id;
      cardType = 'new';
    } else {
      paymentMethodId = cardId;
      cardType = cardExistence;
    }

    if (transactionMode === 'buy') {
      dispatch(purchaseChips({
        requestData: { paymentMethodId, amount, cardType },
        successCallBack: (response) => {
          setIsLoading(false);
          setTimeout(() => { history.push(`/ChipzBalance`) }, 3000);
        },
        failCallBack: () => setIsLoading(false),
      }));
    } else if (transactionMode === 'refund') {
      dispatch(refundChips({
        requestData: { paymentMethodId, cardType, refundType },
        successCallBack: (response) => {
          setIsLoading(false);
          setTimeout(() => { history.push(`/ChipzBalance`) }, 3000);
        },
        failCallBack: () => setIsLoading(false),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-card'>
        <label>Card Information</label>
        <CardElement />
      </div>
      {transactionMode === 'buy' && (
        <div className='total-area'>
          <h3>Order Total</h3>
          <h3>${amount}</h3>
        </div>
      )}
      <button className='btn btn-secondary' type="submit" disabled={!stripe || isLoading}>
        {!isLoading ? 'Done' : <i className="fa fa-spinner fa-spin fa-fw"></i>}
      </button>
    </form>
  );
};

const SelectCard = (props) => {
  const dispatch = useDispatch();
  const { userCards } = useSelector(st => st.Auth)
  const { history, location, loading, isActive, toggleLoader } = props;

  const [cardType, setCardType] = useState('new');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [isCongratulationsModal, setCongratulationsModal] = useState(false);

  useEffect(() => {
    dispatch(getUserCards());
  }, []);

  const handleExistingCard = (cardId) => {
    setCardType('existing');
    setPaymentMethodId(cardId);
  };

  const toggleCongratulationsModal = () => setCongratulationsModal(!isCongratulationsModal);

  return (
    <div className={isActive ? 'challenge-details-page singup-page transaction-history-page active' : 'challenge-details-page singup-page transaction-history-page'}>
      <Sidebar />
      <div className="content">
        <NavbarInner />
        <div className="transaction-box signup-form">
          <div className='challenge-top-area'>
            <h2>Select card</h2>
          </div>
          <div class="radio-buttons card-select-area">
            {userCards && userCards.map(card => {
              return (
                <div className='radio-btns-area' onClick={() => handleExistingCard(card.paymentMethodId)}>
                  <label class="custom-radio">
                    <input type="radio" name="radio" />
                    <span class="radio-btn">
                      <div class="hobbies-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                          <rect x="0.552246" y="0.48584" width="36.2148" height="36.2148" rx="18.1074" fill="#329DFF" fill-opacity="0.1" />
                          <path d="M10.9614 15.25H26.9614M10.9614 15.9H26.9614M13.423 20.45H18.346M13.423 22.4H15.8845M12.8076 25H25.1153C25.6049 25 26.0745 24.7946 26.4207 24.4289C26.7669 24.0632 26.9614 23.5672 26.9614 23.05V13.95C26.9614 13.4328 26.7669 12.9368 26.4207 12.5711C26.0745 12.2054 25.6049 12 25.1153 12H12.8076C12.3179 12 11.8484 12.2054 11.5022 12.5711C11.1559 12.9368 10.9614 13.4328 10.9614 13.95V23.05C10.9614 23.5672 11.1559 24.0632 11.5022 24.4289C11.8484 24.7946 12.3179 25 12.8076 25Z" stroke="#156CF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                      <div className='text-box'>
                        <h3 class="">{card.brand.toUpperCase()} CARD</h3>
                        <p>xxxx xxxx xxxx {card.last4Digits}</p>
                      </div>
                      <div className='card-detail-area'>
                        <p className='card-name'>Expiry: {`${card.expiryMonth < 10 ? `0${card.expiryMonth}` : card.expiryMonth}/${card.expiryYear % 100}`}</p>
                        <p className='card-name'>Zip: {card.zipCode}</p>
                      </div>
                    </span>
                  </label>
                </div>
              )
            })}
          </div>
          <div className='card-details-area'>
            <h3>Enter Card Details</h3>
            <div className='card-box'>
              <div className='icon'>
                <img src={require('../../static/images/card-icon.png')} alt='' />
              </div>
              <div className='text-box'>
                <h4>Credit Card</h4>
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                history={history}
                transactionMode={location?.state?.transactionMode}
                cardId={paymentMethodId}
                cardExistence={cardType}
                amount={location?.state?.transactionMode === 'buy' && Number(location?.state?.amount)}
                refundType={location?.state?.refundType}
              />
            </Elements>
          </div>
        </div>
      </div>
      <Modal isOpen={isCongratulationsModal} toggle={toggleCongratulationsModal} className={`main-modal congratulations-modal`}>
        <ModalHeader toggle={toggleCongratulationsModal}></ModalHeader>
        <ModalBody>
          <div className='content-area'>
            <h2>Congratulations!</h2>
            <p>Your Transaction<br /> was successful</p>
            <Link className='modal-btn' to="#">Get Started</Link>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SelectCard;