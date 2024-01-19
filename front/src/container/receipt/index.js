import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";
import BackButton from '../../component/button_back';
import Recive_create from '../recive-create';
import { Alert, Skeleton, LOAD_STATUS } from '../../component/load';
import { getDate } from '../../util/getDate'
import { useState } from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Receipt() {


  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState(30000);
  const { id: receiptId } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch("http://localhost:4000/post-list");
      const responseData = await res.json();

      if (res.ok) {
        setData(convertData(responseData));
        setStatus(LOAD_STATUS.SUCCESS);

        // Обновление баланса суммой новых элементов
        updateBalance(responseData.list);
      } else {
        setMessage(responseData.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),
    isEmpty: raw.list.length === 0,
  });

  const updateBalance = (newItems) => {
    const sumOfNewItems = newItems.reduce((sum, item) => sum + parseFloat(item.text), 0);
    setBalance(prevBalance => prevBalance + sumOfNewItems);
  };

  useEffect(() => {
    if (status === null) {
      getData();
    }
  }, [status]);

  
  const recive = () => {
    navigate('/recive');
  };

  const settings = () => {
    navigate('/settings');
  };
  const receipt = () => {
    navigate('/receipt');
  };


  return (
   <div className='balance_body'>
<BackButton />
    <div className='Header_recive'>
    <div className='title_recive_flex'>
   <div className='title_recive'>Transaction</div>
   </div>
   {(data && data.list.map((item) => (
              <Fragment>
              {item.id === parseInt(receiptId) && (
                <div>
                <div className='sum_receipt'>
                  +{item.text}$
                </div>
                <div className='init'>
                <div>Date</div>
                <div>{item.date}</div>
                </div>
                <div className='init'>
                <div>Address</div>
                <div>user123@mail.com</div>
                </div>
                <div className='init'>
                <div>Type</div>
                <div>Recive</div>
                </div>
                
                </div>





              )}
            </Fragment>
            ))
            )}


</div>

</div>
);
}
