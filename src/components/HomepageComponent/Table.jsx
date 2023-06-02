import { useTranslation } from 'react-i18next';
import { baseURL } from '../../features/auth/loginSlice';
import { memo, } from 'react';
import axios from 'axios';
import { authenticate } from '../../features/auth/loginSlice';
import {  useDispatch } from 'react-redux';

const Table = ({tableData})=>{
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const renderTable = () => {
        const table = [];
        for (let i = 0; i < (8-tableData.length); i++) {
          const row = [];
    
          for (let j = 0; j < 9; j++) {
            row.push(
              <td  className="bg-white border border-gray-400 px-6 py-3 "key={j}></td>
            );
          }
    
          table.push(<tr key={i}>{row}</tr>);
        }
    
        return table;
      };
 
    const deleteRecord=(id)=>{
      axios.delete(`${baseURL}/fares`,{
        params: {
          recordId:id
        },withCredentials: true
      } )
      .then(response => {
        dispatch(authenticate())
     
      })
      .catch(error => {
        console.error(error)
      });
       
    }



 return (
    <div className='py-3'>  
      <div className=" relative max-h-[250px]  overflow-auto">
    
        <table className="">
          <thead className="text-xs text-black uppercase bg-[#D9D9D9] ">
            <tr>
                <th scope="col" className="py-3 px-4 px-auto border border-gray-500 flex-nowrap ">
                 {t('date2')}
                </th>
                <th scope="col" className="py-3 px-14 border border-gray-500 ">
                {t('destination')}
                </th>
                <th scope="col" className="border px-4 border border-gray-500  max-w-xs truncate">
                {t('vehicle')}
                </th>
                <th scope="col" className="py-3 px-6 border border-gray-500  max-w-xs truncate">
                {t('departure')}
                </th>
                <th scope="col" className="py-3 px-6 border border-gray-500  max-w-xs truncate">
                {t('arrival')}
                </th>
                <th scope="col" className="py-3 px-2  border border-gray-500  max-w-xs truncate">
                {t('Round')}
                </th>
                <th scope="col" className="py-3 px-1 border border-gray-500  max-w-xs truncate">
                {t('purchase')}
                </th>
                <th scope="col" className="py-3 px-2  border border-gray-500  max-w-xs truncate">
                {t('price')}
                </th>
                <th scope="col" className="px-1 py-3 border border-gray-500  max-w-xs truncate">
                {t('delete')}
                </th>
            </tr>
        </thead>
        <tbody>
         {tableData.map((data,i)=>(
            <tr className="bg-white" key={i}>
                <td className="px-2 py-1  border border-gray-400 text-xs max-w-xs truncate">{data.visitDate}</td>
                <td className="px-2  border border-gray-400 text-xs flex-wrap">{data.visitLocation}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate">{data.transportation==='train'&&t('train')}{data.transportation==='bus'&&t('bus')}{data.transportation==='taxi'&&t('taxi')}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate">{data.departure}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate">{data.destination}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate">{data.isRoundTrip?t('2way'):t('1way')}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate">{data.payMethod==='1'?t('cash'):t('IC')}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate">{data.fee}</td>
                <td className="px-2  border border-gray-400 text-xs max-w-xs truncate" >
                  <button onClick={()=>deleteRecord(data.recordId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </button>
                </td>
            </tr>
         ))}
         {renderTable()} 
       
        </tbody>
    </table>
</div>


    </div>
 )
}

export default memo(Table);