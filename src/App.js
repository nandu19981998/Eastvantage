import React, { useState, useEffect } from 'react';
import style from './App.module.scss';
import Button from './components/Button';
import Loader from './components/Loader';
import useOnlineStatus from './hooks/useOnlineStatus';
import axiosInstance from './utility/axiosConf';

const App = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(false);
  const isOnline = useOnlineStatus();

  const getDataFromAPI = async () => {
    if (navigator.onLine) {
      try {
        const { data } = await axiosInstance.get('/');
        await localStorage.setItem('API_DATA', JSON.stringify(data));
        setDetails(data?.results);
      } catch (err) {
        setError(true);
      }
    } else {
      const dataFromLocal = await localStorage.getItem('API_DATA');
      setDetails(JSON.parse(dataFromLocal).results);
    }
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  useEffect(() => {
    if (error) {
      alert('Something wrong happened. Please Retry!');
    }
  }, [error]);

  return (
    <div className={style.appContainer}>
      <h1>Name and Email Address</h1>
      {!isOnline && <p className={style.offlineStatus}>(App currently serving in Offline mode)</p>}
      {!error && (
        <main>
          {details ? (
            <ul className={style.listWrapper}>
              {details.map((item, index) => (
                <li key={index + item?.id?.name}>
                  <span className={style.name}>{`${item.name?.title} ${item.name?.first} ${item.name?.last}`}</span>
                  <span className={style.emailId}>{item.email}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Loader />
          )}
        </main>
      )}
      <Button onClick={() => getDataFromAPI()}>Click to refresh</Button>
    </div>
  );
};

export default App;
