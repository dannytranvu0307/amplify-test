import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
function HomeUserData(){
    const { t } = useTranslation();
    const user= useSelector(state =>state.login.user)
   
    return (
    <div className="">
       {user&&<div className='flex space-y-5 gap-x-20 flex-col md:flex-row'>
        <div className=""><span className='text-xs'>{t('name2')}</span><div className='bg-[#D9D9D9]   p-1 rounded-lg flex-1 w-40 text-gray-600'> {user.fullName} </div></div>
        <div className=""><span className='text-xs'>{t('departmentId')}</span><div className=' bg-[#D9D9D9] p-1 rounded-lg flex-1 w-40 text-gray-600 '> {user.department.departmentName}</div></div>
        </div>}

    </div>
    )
}
export default HomeUserData