import { useTranslation } from 'react-i18next';
function HomeFooter({onAdd , data, onPrice , error, setError , warning}){
    const { t } = useTranslation();
    return (
     <div className='w-full'>
     <div className='flex justify-between w-full'>
        <div className=''>
            <span className='my-5 text-xs'>{t("price")}</span>
            <div className=' '><input className={`w-32 h-8 border-[1px] border-black rounded px-2 ${error.price&&("border-red-500 bg-red-100 text-red-500")} `} 
            value={data.price} 
            onChange={e=>{onPrice(e.target.value),setError({...error,price:false})}}
           
           /></div> 
         </div>
        <div className='mt-auto flex'>
         <button className=' w-20 h-8 rounded text-white text-xs  bg-primary-600 hover:bg-primary-500' onClick={()=>onAdd()}>{t("add") }</button>
        </div>

     </div>
     <div className='text-red-500 py-2'>{warning}</div>
     
     </div>
    )
}
export default HomeFooter;