import React, { useState , useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const SwitchButton = ({isOn,setIsOn}) => {
  const user= useSelector(state =>state.login.user)
  const [isDisable, setDisable]= useState(false)
  const { t } = useTranslation();
  useEffect(()=>{
    if(user){
      if(user.commuterPass===null){
        setDisable(true)
        setIsOn(false)
      }else{
        setDisable(false)
      }
    }
  },[user])
  return (
    
<div className='flex py-2 '>
  <div> 
 <div><span className="text-sm font-medium text-black ">{t('reason_ticket')}</span></div>
 <label className="relative inline-flex items-center mr-5 cursor-pointer ">
  <input type="checkbox" value="" className="sr-only peer"  onChange={()=>setIsOn(!isOn)} disabled ={isDisable} />
  <div className={`w-11 h-6 bg-[#4B5563] rounded-full peer  
   peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
   after:absolute after:top-0.5 after:left-[22px] 
   after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
    
   ${isDisable?('bg-gray-300 after:bg-gray-500'):('after:bg-green-500 peer-checked:after:bg-gray-200 ')}`}></div>
</label>
</div>
<div>
  {isDisable&&<span className='text-xs text-red-500'>{t('commuterPassMess')}</span>}
</div>
</div>  


  );
};

export default SwitchButton;