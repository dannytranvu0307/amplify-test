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
 <div><span className="text-xs font-medium text-black whitespace-nowrap">{t('reason_ticket')}</span></div>
 <label className="relative inline-flex items-center mr-5 cursor-pointer ">
  <input type="checkbox" value="" className="sr-only peer"  onChange={()=>setIsOn(!isOn)} disabled ={isDisable} />
  <div className={`w-11 h-6 bg-[#1CD059] rounded-full peer  
  peer-focus:ring-green-300  peer-checked:after:-translate-x-full 
  peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-[2px] 
  after:bg-[#F9FAFB] after:border-gray-300
   after:border after:rounded-full after:h-5 after:w-5 
   after:transition-all peer-checked:bg-gray-300
   ${isDisable?('bg-gray-300 after:bg-gray-500'):('after:bg-white')}`}></div>
</label>
</div>
<div className='px-2'>
  {isDisable&&<span className='text-xs text-red-500'>{t('commuterPassMess')}</span>}
</div>
</div>  


  );
};

export default SwitchButton;