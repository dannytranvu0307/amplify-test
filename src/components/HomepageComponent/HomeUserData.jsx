import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
function HomeUserData(){
    const { t } = useTranslation();
    const user= useSelector(state =>state.login.user)
  
   console.log(user)
    return (
    <div className="">
       {user&&<div className='flex gap-20 '>
        <div className=""><span className='text-xs'>{t('name2')}</span><div className='bg-[#D9D9D9] p-1 rounded-lg flex-1 w-40'> {user.fullName} </div></div>
        <div className=""><span className='text-xs'>{t('departmentId')}</span><div className=' bg-[#D9D9D9] p-1 rounded-lg flex-1 w-40 '> {user.department.departmentName}</div></div>
        </div>}

    </div>
    )
}
export default HomeUserData