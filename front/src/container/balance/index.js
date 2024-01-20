import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import Recive from '../recive';
import { Fragment } from 'react';
import Button from '../../component/button';
import "./index.css";
import BackButton from '../../component/button_back';
import Recive_create from '../recive-create';
import { Alert, Skeleton, LOAD_STATUS } from '../../component/load';
import { getDate } from '../../util/getDate';

export default function Balance() {

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState(0);

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
    newItems.forEach((item) => {
      if (item.username.endsWith('.com')) {
        // Если username это почта, вычитаем значение text
        setBalance((prevBalance) => prevBalance - parseFloat(item.text));
      } else {
        // В противном случае, добавляем значение text
        setBalance((prevBalance) => prevBalance + parseFloat(item.text));
      }
    });
  };

  useEffect(() => {
    if (status === null) {
      getData();
    }
  }, [status]);

  const recive = () => {
    navigate('/recive');
  };
  const ball = () => {
    navigate('/ball');
  };

  const settings = () => {
    navigate('/settings');
  };
  const receipt = (id) => {
    navigate(`/receipt/${id}`);
  };

  const send = () => {
    navigate('/send');
  };

  return (
    <div className='balance_body'>
    <header className="">
      <div className='header_balance'>
      <div className='header_balance_gradient'>
     <div className='header_icon'>
      <div className='settings' onClick={settings} ></div>
      <div className='header_title'>Main wallet</div>
      <div className='bell' onClick={ball} ></div>
     </div>
     <div className='balance'>$ {balance}</div>
     </div>
     </div>
     <div className='button__section'>
     <div className='Button_Receive'>
      <div className=' receive_redius' onClick={recive}>
        <div className='icon_receive'></div>
      </div>
     </div>
     <div className='Button_Send'>
     <div className=' receive_redius' onClick={send}>
        <div className='icon_people-upload'></div>
      </div>
     </div>
     </div>
    </header>
    {data && data.isEmpty ? (
          <Alert messaeg="Список квитанций пуст." />
          ) : (
            data && data.list.map((item) => (
              <Fragment key={item.id}>
                <form className='replenishment'>
                  <div className='form_display' onClick={() => receipt(item.id)}>
                  <div className={item.username === 'Coinbase' ? 'logo_form_two' : (item.username === 'Stripe' ? 'logo_form' : (item.username.endsWith('.com') ? 'logo_user' : ''))}>
                    </div>    
                    <div className='date_replenis'>
                      <div className='name_replenishment'>{item.username}</div>
                      <div className='date'>{item.date.split(' ')[1]} • {item.username.endsWith('.com') ? 'Sending' : 'Receipt'} </div>
                    </div>
                    <div className={item.username.endsWith('.com') ? "send" : "sum"}>{item.username.endsWith('.com') ? '-' : '+'}{item.text}$</div>
                  </div>
                </form>
              </Fragment>
            ))
            )}
        </div>
  );
}




    {/* <form className='replenishment'>
      <div className='form_display'>
        <div className='logo_form_two'></div>
        <div className='date_replenis'>
        <div className='name_replenishment'>Получатель</div>
        <div className='date'>дада || * квитанция или отправка</div>
        </div>
        <div className='sum'>1000$</div>
      </div>

    </form> */}