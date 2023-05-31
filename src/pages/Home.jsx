
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
import axios from 'axios';
import { authenticate } from '../features/auth/loginSlice';
function Home() {
   const { t } = useTranslation();
    const [data,setData] =useState({date:"",vehicle:'train', Destination:"", price:"" , round:t('1way'),departure:"",arrival:"", payment:"" ,transport:""});
    const [error,setError]=useState({date:false ,payment:false,Destination:false,departure:false,arrival:false , price:false})
    const [TableData,setTableData]= useState([])
    const [image, setImage] =useState([]);
    const [searching , setSearching] = useState([]);
    const [isOn, setIsOn] = useState(true);
    const dispatch = useDispatch()
    const [warning , setWarning ]= useState('');


    const  user= useSelector(state =>state.login.user)

     useEffect(()=>{
      if(user){ 
        setTableData(user.fares)
      }
     },[user, image])

      const handleDateChange = (newData) => {
      setData({ ...data,date:newData});
      };
      const handleVehicleChange = (option) => {
        setData({ ...data,vehicle:option});
      };
      const handlePayment = (option) => {
        setData({ ...data,payment:option});
      };

      const handleRound = (option) => {
        setData({ ...data,round:option});
      };

      const handleDestination= (option) => {
        setData({ ...data, Destination:option});

      };
      const handleDeparture =(option) => {
        setData({ ...data,departure:option});

      };
      const handleArrial = (option) => {
        setData({ ...data,arrival:option});

      };  
      const handleTransport= (option) => {
        setData({ ...data,transport:option});
      };
      const handlePrice= (option) => {
        setData({ ...data,price:option});
      };





  const handleFileChange = (file) => {
         convertAllToBase64(file)
      };
     

  const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const convertAllToBase64 = async (img) => {
  const base64Images = [];

  for (const file of img) {
    try {
      const base64 = await convertToBase64(file);
      base64Images.push({name:file.name,fileURL:base64});
    } catch (error) {
      return error
    }
  }
      setImage([...image,...base64Images])
        const data = {
              imageList:[...image,...base64Images],
            };
          try { const dataJSON = JSON.stringify(data);
            localStorage.setItem('imageData', dataJSON);
          } catch (error) {
            console.error('Error saving data to localStorage:', error);
          }

};



  const handleDeleteImage= (index)=>{
       setImage(image.filter((_ , i) => i!== index))
       try {
        const data = {
          imageList:[...image.filter((_ , i) => i!== index)],
        };
    
        const dataJSON = JSON.stringify(data);
        localStorage.setItem('imageData', dataJSON);
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
       }

       
       const  handleAddTable= () => {
        if(data.vehicle==='train'){
          const { date, Destination, departure, arrival, payment , price} = data;
          const updatedError = {
          date: date === "",
          Destination: Destination === "",
          departure: departure === "",
          arrival: arrival === "",
          payment: payment === "",
          price: price ===""
        };
        setError(updatedError);
        if(Object.values(updatedError).every((value)=> value===false)){
          const form = {
             visitLocation: data.Destination,
             departure:data.departure,
             destination: data.arrival,
             payMethod: data.payment===t('IC')?"1":"2",
             useCommuterPass: isOn,
             isRoundTrip: data.round ===t('2way'),
             fee: data.price,
             transportation:data.vehicle,
             visitDate: FormatDate(data.date,"YYYY/MM/DD")
          }
          
          axios.post('http://localhost:8080/api/v1/fares', form, {
            withCredentials: true,
          })
            .then(response => {
              dispatch(authenticate())
              // setTableData((prev)=>[...prev,{...data,payment:t('cash')}])
              setData({date:"",vehicle:data.vehicle, Destination:"", price:"" , round:t('1way'),departure:"",arrival:"", payment:"" ,transport:""})
              setSearching([])
              setWarning('')
             
            })
            .catch(error => {
              // Handle errors
              console.error(error);
            });

          
        }else{
          setWarning(t('warning'))
    
        }
      }
      else{
        const { date, Destination, departure, arrival,price} = data;
        const updatedError = {
          date: date === "",
          Destination: Destination === "",
          departure: departure === "",
          arrival: arrival === "",
          price: price ===""
        };
        setError(updatedError);
        if(Object.values(updatedError).every((value)=> value===false)){
          const form = {
            visitLocation: data.Destination,
            departure:data.departure,
            destination: data.arrival,
            payMethod: "1",
            useCommuterPass: false,
            isRoundTrip: false,
            fee: data.price,
            transportation:data.vehicle,
            visitDate: FormatDate(data.date,"YYYY/MM/DD")
         }
         axios.post('http://localhost:8080/api/v1/fares', form, {
          withCredentials: true,
        })
          .then(response => {
            dispatch(authenticate())
            // setTableData((prev)=>[...prev,{...data,payment:t('cash')}])
            setData({date:"",vehicle:data.vehicle, Destination:"", price:"" , round:t('1way'),departure:"",arrival:"", payment:"" ,transport:""})
            setSearching([])
            setWarning('')
           
          })
          .catch(error => {
            // Handle errors
            console.error(error);
          })
        }else{
          setWarning(t('warning'))
        }
      } }
       

useEffect(()=>{


  const dataJSON = localStorage.getItem('imageData');
  
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setImage(data.imageList)
      
    }
},[])

    return (
        <div className="w-full h-full bg-[#F9FAFB] ">
          
         
          <div className='flex  sm:flex-col md:flex-row h-full  mb-auto'>  
             <div className='flex flex-col basis-1/3 border-r-2 border-gray-500 px-3 h-full '>
              <div className='flex '>
                <HeaderInput onDateChange={handleDateChange} data ={data} 
                             onVehiclechange={handleVehicleChange} 
                             onPayment ={handlePayment} 
                             onRound ={handleRound } 
                             onDestination ={handleDestination} 
                             error={error}
                             setError={setError}
                 /> </div>
              <div className='flex'>
                 {data.vehicle==='train'&&<SearchTrain 
                 isOn={isOn}
                 setIsOn ={setIsOn}
                 onSearching={setSearching} onDepart ={handleDeparture} onArrival={handleArrial} onTransport ={handleTransport} data={data} error ={error} setError={setError}/>}
                 {data.vehicle==='bus'&&<SearchBus onDepart ={handleDeparture} onArrival={handleArrial} data={data} error ={error} setError={setError}/>}
                 {data.vehicle==='taxi'&&<SearchBus onDepart ={handleDeparture} onArrival={handleArrial} data={data } error ={error} setError={setError}/>}
               </div>
               <SearchResult search={searching} data={data} onPrice={handlePrice} isOn ={isOn} />
              <div className='flex mt-auto pb-[150px]'>
                <HomeFooter warning={warning} onPrice={handlePrice} data ={data} onAdd={handleAddTable} error ={error} setError={setError}/>
                </div>
             
             </div>



             <div className='pl-5 w-full flex-1 h-full'>
              <div className='flex flex-col h-full'>
                <div className='flex'><HomeUserData /></div>
                <div className='max-w-[700px]'> <Table tableData={TableData}/>
                
                <div className='w-full my-2 h-[30%]'>{TableData.length>=1&&<PreviewImage image={image} onDelete ={handleDeleteImage}/>}</div>
                </div>
               
                <div className='flex mt-auto pb-[150px] max-w-[750px]' ><HomeFooter2 img={image} deleteAllFile={setImage} onFileChange={handleFileChange} tableData={TableData}/></div>
              </div>
               
             </div>



         
          </div>
        </div>
)
}
export default Home