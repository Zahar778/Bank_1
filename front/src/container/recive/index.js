import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";
import BackButton from '../../component/button_back';
import Recive_create from '../recive-create';
import { Alert, Skeleton, LOAD_STATUS } from '../../component/load';
import { getDate } from '../../util/getDate'
import { useState } from 'react';

export default function Recive() {
  const [status, setStatus] = useState(null);
  const [messaeg, setMessage] = useState('');
  const [data, setData] = useState(null);



  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
        const res = await fetch("http://localhost:4000/post-list");
        const data = await res.json();

        if(res.ok) {
            setData(convertData(data));
            setStatus(LOAD_STATUS.SUCCESS);
        } else {
            setMessage(data.messaeg);
            setStatus(LOAD_STATUS.ERROR);
        }
    } catch (error) {
        setMessage(error.messaeg)
        setStatus(LOAD_STATUS.ERROR);
    }
};
const convertData = (raw) => ({
  list: raw.list.reverse().map(({id,username,text,date}) =>({
      id,
      username,
      text,
      date: getDate(date),
  })),
  isEmpty: raw.list.length === 0,
});

if(status === null) {
  getData();
}

  return (
   <div className='balance_body'>
<BackButton />
    <div className='Header_recive'>
    
    <div className='title_recive_flex'>
   <div className='title_recive'>Receive</div>
   </div>
   <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Receive amount</div>
                <label className="field__label"></label>
                <Recive_create
                onCreate={getData}
                placeholder="Sum"
                
                />
              </div>
            </div>
          </div>
   </form>

</div>

</div>
);
}
