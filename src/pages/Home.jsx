
import { useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import HeaderInput from '../components/HomepageComponent/HeaderInput';
import SearchBus from '../components/HomepageComponent/SearchBus';
import SearchTrain from '../components/HomepageComponent/SearchTrain';
import HomeUserData from '../components/HomepageComponent/HomeUserData';
import HomeFooter from '../components/HomepageComponent/HomeFooter1';
import Table from '../components/HomepageComponent/Table';
import HomeFooter2 from '../components/HomepageComponent/HomeFooter2';
import PreviewImage from '../components/HomepageComponent/PreviewImage';
import SearchResult from '../components/HomepageComponent/SearchResult';
import FormatDate from '../functional/FormatDate';
import { useSelector, useDispatch } from 'react-redux';
import { baseURL } from '../features/auth/loginSlice';
import axios from 'axios';
import { authenticate } from '../features/auth/loginSlice';
import Resizer from "react-image-file-resizer";



function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [data, setData] = useState({ date: "", vehicle: 'train', Destination: "", price: "", round: t('1way'), departure: "", arrival: "", payment: "", transport: "" });
  const [error, setError] = useState({ date: false, payment: false, Destination: false, departure: false, arrival: false, price: false })
  const [TableData, setTableData] = useState([])
  const [image, setImage] = useState([]);
  const [searching, setSearching] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [warning, setWarning] = useState('');
  const [id, setId] = useState({});
  const [isInputVisible, setInputVisible] = useState(false);
 

  useEffect(() => {
    dispatch(authenticate())
    const data = JSON.parse(localStorage.getItem('imageData'))
    if (data) {
      setImage(data.imageList)
    }
  }, [])

  const user = useSelector(state => state.login.user)

  useEffect(() => {
    if (user) {
      setTableData(user.fares)
    }
  }, [user])


  const handleVehicleChange = (option) => {
    setData({ date:data.date, vehicle: option, Destination: "", price: "", round: t('1way'), departure: "", arrival: "", payment: "", transport: "" });
    setError({ date: false, payment: false, Destination: false, departure: false, arrival: false, price: false });
    setSearching([])
    setWarning('')
  };
  
  const handleDateChange = (newData) => {
    setData({ ...data, date: newData });
  };
  const handlePayment = (option) => {
    setData({ ...data, payment: option });
  };

  const handleRound = (option) => {
    setData({ ...data, round: option });
  };

  const handleDestination = (option) => {
    setData({ ...data, Destination: option });

  };
  const handleDeparture = (option) => {
    setData({ ...data, departure: option });

  };
  const handleArrial = (option) => {
    setData({ ...data, arrival: option });

  };

  const handleTransport = (option) => {
    if(option===''){
    delete id.viaCode
    }
  
    setData({ ...data, transport: option });
  };
  const handlePrice = (option) => {
    setData({ ...data, price: option });
  };

  const handleFileChange = (file) => {
    convertAllToBase64(file)
  };
  //convert all image
  const convertAllToBase64 = async (img) => {
    const base64Images = [];
    for (const file of img) {
      const compressedImage = await compressImage(file);
      base64Images.push({ name: file.name, fileURL: compressedImage });
    }
    setImage([...image, ...base64Images])
    const data = {
      imageList: [...image, ...base64Images],
    };
    try {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem('imageData', dataJSON);
    } catch (error) {
      return error
    }

  };
  //covert image too
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        600, // Chiều rộng mới (ví dụ: 800px)
        600, // Chiều cao mới (ví dụ: 600px)
        'JPEG', // Định dạng ảnh mới (ví dụ: JPEG)
        95, // Chất lượng ảnh mới (từ 0 - 100)
        0, // Độ quay ảnh mới (đối với ảnh xoay: 90, 180, 270)
        (uri) => {
          resolve(uri);
        },
        'base64', // Loại dữ liệu đầu ra (base64)
        600, // Chiều rộng tối đa (tùy chọn, ví dụ: 800px)
        600 // Chiều cao tối đa (tùy chọn, ví dụ: 600px)
      );
    });
  };


  const handleDeleteImage = (index) => {
    setImage(image.filter((_, i) => i !== index))
    try {
      const data = {
        imageList: [...image.filter((_, i) => i !== index)],
      };

      const dataJSON = JSON.stringify(data);
      localStorage.setItem('imageData', dataJSON);
    } catch (error) {
      return error
    }
  }


  const handleDeleteAll = () => {
    setImage([])
    try {
      const data = {
        imageList: [],
      };
      const dataJSON = JSON.stringify(data);
      localStorage.setItem('imageData', dataJSON);
    } catch (error) {
      return error
    }
  }

  const handleAddTable = () => {
    if (data.vehicle === 'train') {
      const { date, Destination, departure, arrival, payment, price } = data;
      const updatedError = {
        date: date === "" || date ===null || data === undefined,
        Destination: Destination === "",
        departure: departure === "" || departure === arrival,
        arrival: arrival === "" || departure === arrival,
        payment: payment === "",
        price: price === "",
        priceLength: price.length > 8,
        priceType: isNaN(price),
        equal: departure === arrival

      };
      setError(updatedError);
      if (Object.values(updatedError).every((value) => value === false)) {
        const form = {
          visitLocation: data.Destination,
          departure: data.departure,
          destination: data.arrival,
          payMethod: data.payment === t('IC') ? "1" : "2",
          useCommuterPass: isOn,
          isRoundTrip: data.round === t('2way'),
          fee: data.price,
          transportation: data.vehicle,
          visitDate: FormatDate(data.date, "YYYY/MM/DD")
        }

        axios.post(`${baseURL}/fares`, form, {
          withCredentials: true,
        })
          .then(response => {
            // dispatch(authenticate())
            const newTb= [...TableData,response.data.data]
            const sortedTable = [...newTb].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
            setTableData(sortedTable)
            setData({ date: "", vehicle: data.vehicle, Destination: "", price: "", round: t('1way'), departure: "", arrival: "", payment: "", transport: "" })
            setSearching([])
            setWarning('')
            setId({})
            setInputVisible(false)
          })
          .catch(error => {
            // Handle errors
            return error
          });


      } else if (updatedError.priceLength) {
        setWarning(t('warningLength'))
      } else if (isNaN(price)) {
        setWarning(t('warningType'))
      } else if (departure === arrival) {
        setWarning(t('AlertSame'))
      }
      else {
        setWarning(t('warning'))
      }
    }
    else {
      const { date, Destination, departure, arrival, price } = data;
      const updatedError = {
        date: date === "" || date === undefined,
        Destination: Destination === "",
        departure: departure === "" || departure === arrival,
        arrival: arrival === "" || departure === arrival,
        price: price === "",
        priceLength: price.length > 8,
        priceType: isNaN(price),
        equal: departure === arrival
      };
      setError(updatedError);
      if (Object.values(updatedError).every((value) => value === false)) {
        const form = {
          visitLocation: data.Destination,
          departure: data.departure,
          destination: data.arrival,
          payMethod: "1",
          useCommuterPass: false,
          isRoundTrip: false,
          fee: data.price,
          transportation: data.vehicle,
          visitDate: FormatDate(data.date, "YYYY/MM/DD")
        }
        axios.post(`${baseURL}/fares`, form, {
          withCredentials: true,
        })
          .then(response => {
            // dispatch(authenticate())
            // setTableData((prev)=>[...prev,{...data,payment:t('cash')}])
            const newTb= [...TableData,response.data.data]
            const sortedTable = [...newTb].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
            setTableData(sortedTable)
            setData({ date: "", vehicle: data.vehicle, Destination: "", price: "", round: t('1way'), departure: "", arrival: "", payment: "", transport: "" })
            setSearching([])
            setWarning('')
        

          })
          .catch(error => {
            return error
          })

      } else if (updatedError.priceLength) {
        setWarning(t('warningLength'))
      } else if (isNaN(price)) {
        setWarning(t('warningType'))
      } else if (departure === arrival) {
        setWarning(t('AlertSame'))
      }
      else {
        setWarning(t('warning'))
      }
    }
  }

  return (
    <div className="w-full h-full overflow-auto bg-[#F9FAFB]"
    
    >
      <div className='flex flex-col lg:flex-row h-full mx-auto mt-10 md:mt-0 md:pl-16'>
        <div className='flex flex-col ml-0 lg:mx-auto md:basis-1/3  px-3 h-full'>
          <div className='flex '>
            <HeaderInput onDateChange={handleDateChange} data={data}
              onVehiclechange={handleVehicleChange}
              onPayment={handlePayment}
              onRound={handleRound}
              onDestination={handleDestination}
              error={error}
              setError={setError}
            /> </div>
          <div className='flex w-full'>
            {data.vehicle === 'train' && <SearchTrain
              isInputVisible={isInputVisible}
              setInputVisible={setInputVisible}
              id={id}
              setId={setId}
              isOn={isOn}
              onWarning={setWarning}
              setIsOn={setIsOn}
              onSearching={setSearching} onDepart={handleDeparture} onArrival={handleArrial} onTransport={handleTransport} data={data} error={error} setError={setError} />}
            {data.vehicle === 'bus' && <SearchBus onDepart={handleDeparture} onArrival={handleArrial} data={data} error={error} setError={setError} />}
            {data.vehicle === 'taxi' && <SearchBus onDepart={handleDeparture} onArrival={handleArrial} data={data} error={error} setError={setError} />}
          </div>
          <SearchResult search={searching} data={data} onPrice={handlePrice} isOn={isOn} />
          <div className='flex mt-auto pb-[200px]'>
            {data.vehicle === 'train' ? (searching.length > 0 && <HomeFooter warning={warning} onPrice={handlePrice} data={data} onAdd={handleAddTable} error={error} setError={setError} />) : <HomeFooter warning={warning} onPrice={handlePrice} data={data} onAdd={handleAddTable} error={error} setError={setError} />}
          </div>
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-gray-500 h-full"></div>
        <div className='px-5 w-full h-full'>
          <div className='flex flex-col w-full h-full'>
            <div className='flex '><HomeUserData /></div>
            <div className='w-full '> <Table tableData={TableData} setTableData={setTableData}/>
              <div className='w-full my-2 h-32  max-w-[700px]  '>{TableData.length >= 1 && <PreviewImage image={image} onDelete={handleDeleteImage} />}</div>
            </div>
            <div className='max-w-[750px] flex mt-auto pb-[214px]' ><HomeFooter2 img={image} deleteAllFile={handleDeleteAll} onFileChange={handleFileChange} tableData={TableData} /></div>
          </div>

        </div>




      </div>
    </div>
  )
}
export default Home