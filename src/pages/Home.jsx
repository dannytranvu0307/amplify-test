
import { useEffect, useState } from 'react';
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
import { authenticate, refreshToken } from '../features/auth/loginSlice';
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
  const [selectedObject2, setSelectedObject2] = useState(null);
  const user = useSelector(state => state.login.user)
  useEffect(() => {
    if (user) {
      setTableData(user.fares)
    }
  }, [user])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('imageData'))
    if (data) {
      setImage(data.imageList)
    }

  }, [])
  const handleVehicleChange = (option) => {
    setData({ date: data.date, vehicle: option, Destination: "", price: "", round: t('1way'), departure: "", arrival: "", payment: "", transport: "" });
    setError({ date: false, payment: false, Destination: false, departure: false, arrival: false, price: false });
    setSearching([])
    setWarning('')
  };



  const handleTransport = (option) => {
    if (option === '') {
      delete id.viaCode
    }
    setData({ ...data, transport: option });
  };
  const handlePrice = (option) => {
    setData({ ...data, price: option });
  };

  //convert all image
  const handleFileChange = async (img) => {
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
        700, // Chiều rộng mới (ví dụ: 800px)
        600, // Chiều cao mới (ví dụ: 600px)
        'JPEG', // Định dạng ảnh mới (ví dụ: JPEG)
        95, // Chất lượng ảnh mới (từ 0 - 100)
        0, // Độ quay ảnh mới (đối với ảnh xoay: 90, 180, 270)
        (uri) => {
          resolve(uri);
        },
        'base64', // Loại dữ liệu đầu ra (base64)
        700, // Chiều rộng tối đa (tùy chọn, ví dụ: 800px)
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
        date: date === "" || date === null || data === undefined,
        Destination: Destination === "",
        departure: departure === "" || departure === arrival,
        arrival: arrival === "" || departure === arrival,
        payment: payment === "",
        price: price === "" || isNaN(price) || +price < 0 || +price === 0,
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

        const callApi = () => axios.post(`${baseURL}/fares`, form, {
          withCredentials: true,
        })
          .then(response => {

            const newTb = [...TableData, response.data.data]
            const sortedTable = [...newTb].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
            setTableData(sortedTable)
            setData({ ...data, price: '' })
            setSelectedObject2(null)
            setWarning('')
            setInputVisible(false)
          })
          .catch(error => {
            if (error.response.status === 401) {
              dispatch(refreshToken())
                .unwrap()
                .then(res => {
                  if (res.data.type!=='INFO') {
                    localStorage.removeItem('auth')
                    dispatch(authenticate())
                  } else {
                    callApi()
                  }
                })
            }
          });
        callApi();
      } else if (departure === arrival) {
        setWarning(t('AlertSame'))
      } else if (+price < 0 || +price === 0) {
        setWarning(t('minusAlert'))
      } else if (updatedError.priceLength) {
        setWarning(t('warningLength'))
      } else if (isNaN(price)) {
        setWarning(t('warningType'))
      } else {
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
        price: price === "" || isNaN(price) || +price < 0 || +price === 0,
        priceLength: price.length > 8
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
        const callApi = () => axios.post(`${baseURL}/fares`, form, {
          withCredentials: true,
        })
          .then(response => {
            const newTb = [...TableData, response.data.data]
            const sortedTable = [...newTb].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
            setTableData(sortedTable)
            setWarning('')
          })
          .catch(error => {
            if (error.response.status === 401) {
              dispatch(refreshToken())
                .unwrap()
                .then(res => {
                  callApi()
                  if (res.data.type!== 'INFO') {
                    localStorage.removeItem('auth')
                    dispatch(authenticate())
                  } 
                }) 
              }})
        callApi()
      } else if (departure !== '' && departure === arrival) {
        setWarning(t('AlertSame'))
      } else if (updatedError.priceLength) {
        setWarning(t('warningLength'))
      } else if (isNaN(price)) {
        setWarning(t('warningType'))
      } else if (+price < 0 || +price === 0) {
        setWarning(t('minusAlert'))
      }
      else {
        setWarning(t('warning'))
      }
    }
  }

  return (
    <div className="w-full h-full overflow-auto bg-[#F9FAFB]"
      data-aos="fade-down"
      data-aos-easing="ease-out-cubic"
    >
      <div className='flex flex-col lg:flex-row h-full mx-auto mt-10 md:mt-0 md:pl-16'>
        <div className='flex flex-col ml-0 lg:mx-auto md:basis-1/3  px-3 h-full'>
          <div className='flex '>
            <HeaderInput
              data={data}
              setData={setData}
              onVehiclechange={handleVehicleChange}
              error={error}
              setSelectedObject2={setSelectedObject2}
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
              onSearching={setSearching}
              onTransport={handleTransport}
              data={data}
              setData={setData}
              setSelectedObject2={setSelectedObject2}
              error={error}
              setError={setError} />}
            {data.vehicle === 'bus' && <SearchBus setData={setData} data={data} error={error} setError={setError} />}
            {data.vehicle === 'taxi' && <SearchBus setData={setData} data={data} error={error} setError={setError} />}
          </div>
          <SearchResult
            search={searching}
            data={data}
            onPrice={handlePrice}
            isOn={isOn} selectedObject2={selectedObject2} setSelectedObject2={setSelectedObject2} />
          <div className='flex mt-auto pb-[200px]'>
            {data.vehicle === 'train' ? (searching.length > 0 && <HomeFooter warning={warning} onPrice={handlePrice} data={data} onAdd={handleAddTable} error={error} setError={setError} />) : <HomeFooter warning={warning} onPrice={handlePrice} data={data} onAdd={handleAddTable} error={error} setError={setError} />}
          </div>
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-gray-500 h-full"></div>
        <div className='px-5 w-full h-full'>
          <div className='flex flex-col w-full h-full'>
            <div className='flex '><HomeUserData /></div>
            <div className='w-full '> <Table tableData={TableData} setTableData={setTableData} />
              <div className='w-full my-2 h-32  max-w-[700px]  '>{TableData.length >= 1 && <PreviewImage image={image} onDelete={handleDeleteImage} />}</div>
            </div>
            <div className='max-w-[700px] flex mt-auto pb-[214px]' ><HomeFooter2 img={image} deleteAllFile={handleDeleteAll} onFileChange={handleFileChange} tableData={TableData} /></div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default Home