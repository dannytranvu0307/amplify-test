import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import SwitchButton from './SwitchButton';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../features/auth/loginSlice'
import { useSelector } from 'react-redux';

function SearchTrain({ setData,data, onTransport, error, setError, onSearching, isOn, setIsOn , onWarning  , id , setId,isInputVisible, setInputVisible}) {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsArrival, setSuggestionsArrival] = useState([]);
  const [suggestionsTransport, setSuggestionsTransport] = useState([]);
  const [focus, setFocus] = useState({ departure: false, arrival: false, transport: false });

  //trigger of switch button 
  const [alert, setAlert] = useState('')
  const user = useSelector(state => state.login.user)


  const handleClick = () => {
    setInputVisible(true)
  };

  const handleSuggestionClick = (suggestion) => {
    setData({...data, departure:suggestion.stationName})
    setId({ ...id, start: suggestion.stationCode })
    setSuggestions([])
  };
  const handleSuggestionClickArrival = (suggestion) => {
    setData({...data,departure:suggestion.stationName})
    setId({ ...id, goal: suggestion.stationCode })
    setSuggestionsArrival([])
  };

  const handleSuggestionClickTransport = (suggestion) => {
    onTransport(suggestion.stationName);
    setId({ ...id, viaCode: suggestion.stationCode })
    setSuggestionsTransport([])
  };
  
  const handleBlur = () => {
    setFocus({ ...focus, transport: false })
    if (data.transport === "" || data.transport === null || data.transport == undefined) {
      setInputVisible(false)
    } else {
      setInputVisible(true)
    }
  };

  


  const handleSearch = () => {
    
    
    const { date, Destination, departure, arrival, payment, } = data;
    const updatedError = {
      date: date === "" || date === null || date === undefined,
      Destination: Destination === "",
      departure: departure === ""||departure===arrival,
      arrival: arrival === ""||departure===arrival,
      payment: payment === "",
      equal: departure === arrival,
    };



    setError(updatedError);
    if (Object.values(updatedError).every((value) => value === false)) {

      axios.get(`${baseURL}/routes`, {
        params: {
          ...id,
          commuterPass: user.commuterPass ? 1 : 0,
        }, withCredentials: true
      })
        .then(response => {
          // Handle the response
          onSearching(response.data.data)
          setAlert('')
          onWarning('')
        })
        .catch(error => {
          // Handle the error
          onSearching({ noData: t('Result') })
        });
    } else if (date === "" || date === null ||departure===''|| departure === null|| departure=== undefined || arrival==='' || arrival===null ||arrival===undefined||payment ==='' ||payment===null||payment===undefined ) {
      setAlert(t('alert'))
    } else if (departure !== "" && arrival !== "" && departure===arrival) {
      setAlert(t('AlertSame'))
    }
  }



  useEffect(() => {
    if (data.departure.length > 1 && focus.departure) {
      axios.get(`${baseURL}/stations`, {
        params: {
          stationName: data.departure
        }, withCredentials: true
      })
        .then(response => {
          // Handle the response
          setSuggestions(response.data.data)
        })
        .catch(error => {
          // Handle the error
        });
    } else if (data.departure === '' || data.departure === undefined || data.departure === null) {
      setSuggestions([])
    }

  }, [data.departure])


  //Arrival
  useEffect(() => {

    if (data.arrival.length > 1 && focus.arrival) {
      axios.get(`${baseURL}/stations`, {
        params: {
          stationName: data.arrival
        }, withCredentials: true
      })
        .then(response => {
          setSuggestionsArrival(response.data.data)
        })
        .catch(error => {
          return error
        });
    } else if (data.arrival === '' || data.arrival === undefined || data.arrival === null) {
      setSuggestionsArrival([])
    }
  }, [data.arrival])

  // transport 

  useEffect(() => {
    if (data.transport.length > 1 && focus.transport) {
      axios.get(`${baseURL}/stations`, {
        params: {
          stationName: data.transport
        }, withCredentials: true
      })
        .then(response => {
          // Handle the response
          setSuggestionsTransport(response.data.data)
        })
        .catch(error => {
          // Handle the error
        });
    } else if (data.transport === '' || data.transport === undefined || data.transport === null) {
      setSuggestionsTransport([])
    }



  }, [data.transport])


  return (
    <div className='pt-3 w-full min-h-min border-b-[1.5px] border-gray-500 pb-3'>
      <div className='flex'>
        <div className='flex-auto '>
          <span className='my-2 text-xs'>{t("departure")}</span>
          <div className='relative '>
            <input className={`w-full border-[1px] bg-[#F9FAFB] border-black rounded h-8 px-2 ${error.departure && ("border-red-500 bg-red-100")}`}
              value={data.departure}
              placeholder={t("start_pla")}
              onChange={e => { setData({...data,departure:e.target.value}), setError({ ...error, departure: false }) }}
              onFocus={(prev) => setFocus({ ...prev, departure: true })}
              onBlur={(prev) => setFocus({ ...prev, departure: false })}
          
            />
            <ul className='absolute z-10 w-full bg-white rounded-md shadow-md max-h-32 overflow-y-scroll '>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)} className='text-sm px-2 hover:bg-blue-200 rounded py-1'>
                  {suggestion.stationName}
                </li>))}
            </ul>
          </div>
        </div>

        <div className='my-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
         className="w-full h-10 -translate-y-[5px]"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg></div>
        <div className='flex-auto'>
          <span className='my-2 text-xs'>{t("arrival")}</span>
          <div className='relative'>
            <input
              placeholder={t("goal_pla")}
              className={`w-full border-[1px] border-black bg-[#F9FAFB] rounded h-8 px-2 ${error.arrival && ("border-red-500 bg-red-100")}`}
              value={data.arrival}
              onFocus={(prev) => setFocus({ ...prev, arrival: true })}
              onBlur={(prev) => setFocus({ ...prev, arrival: false })}
              onChange={e => {setData({...data,arrival:e.target.value}), setError({ ...error, arrival: false }) }} />
            <ul className='absolute z-10 w-full bg-white rounded-md shadow-md overflow-auto max-h-64 overflow-y-scroll ' >
              {suggestionsArrival.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClickArrival(suggestion)} className='text-sm px-2 py-1 hover:bg-blue-200 rounded'>
                  {suggestion.stationName}
                </li>))}
            </ul>
          </div>
        </div>
      </div>
      <div className=' px-[25%]'>
        <div className='border border-black rounded relative'>
          {isInputVisible ? (
            <input
              className='w-full border-[1px] border-black rounded h-8 px-2 bg-[#F9FAFB]'
              type="text"
              placeholder={t("via_pla")}
              value={data.transport}
              onChange={e => onTransport(e.target.value)}
              onFocus={(prev) => setFocus({ ...prev, transport: true })}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <button onClick={handleClick} className='w-full flex h-8 items-center  justify-center text-xs group'>
              <div className="duration-300 transition w-[24px] h-[24px] bg-green-500 text-white rounded-full flex items-center mr-2 group-hover:bg-gray-100 group-hover:text-green-500 group-hover:rotate-180">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 flex mx-auto">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </div>
              {t("addPath")}</button>
          )}


          <ul className='absolute z-10 w-full bg-white rounded-md shadow-md max-h-64 overflow-y-scroll '>
            {suggestionsTransport.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClickTransport(suggestion)} className='text-sm py-1 px-2 hover:bg-blue-200 rounded'>
                {suggestion.stationName}
              </li>))}
          </ul>
        </div>

      </div>

      <div><SwitchButton isOn={isOn} setIsOn={setIsOn} /></div>
      <div className='text-xs py-2 text-red-500'>{alert}</div>

      <button className='w-24 h-8 items-center  text-xs justify-center rounded-md text-white flex mx-auto  bg-primary-600 hover:bg-primary-500' onClick={handleSearch}> {t("search")}</button>
    </div>
  )
}
export default SearchTrain