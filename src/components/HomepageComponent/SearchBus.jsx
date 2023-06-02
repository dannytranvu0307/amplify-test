import { useTranslation } from 'react-i18next';

function SearchBus({onDepart, onArrival, data ,error,setError}){
    const { t } = useTranslation();
    return(
    <div className='pt-3'>
        <div className='flex pb-[40%]'>
            <div className='flex-auto'>
               <span className='my-2 text-xs'>{t("departure")}</span>
               <div className=' '><input placeholder={t("start_bus_pla")} className={`w-full border-[1px] border-black rounded h-8 px-2 ${error.departure&&("border-red-500 bg-red-100")}`}value={data.departure} onChange={e=>{onDepart(e.target.value),setError({...error,departure:false})}}/></div> 
            </div>
            <div className='flex items-end'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg></div>
            <div className='flex-auto'>
            <span className='my-2 text-xs'>{t("arrival")}</span>
               <div className=' '><input  placeholder={t("goal_bus_pla")}  className={`w-full border-[1px] border-black rounded h-8 px-2 ${error.arrival&&("border-red-500 bg-red-100")}`} value={data.arrival} onChange={e =>{onArrival(e.target.value),setError({...error,arrival:false})}}/></div> 
            </div>
            
        </div>
     
    </div>      
    )
}
export default SearchBus