import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
function HomeUserData(){
    const { t } = useTranslation();
    const user= useSelector(state =>state.login.user)
    return (
    <div className="w-full">
       {user&&<div className='flex gap-x-20 flex-col md:flex-row'>
        <div className="py-2"  title={user.fullName}><span className='text-xs'>{t('name2')}</span><div className='bg-[#D9D9D9] text-xs p-2 whitespace-nowrap overflow-hidden p-1 rounded flex-1 w-40 text-gray-600 text-ellipsis'> {user.fullName} </div></div>
        <div className="py-2"><span className='text-xs'>{t('departmentId')}</span><div className=' bg-[#D9D9D9] text-xs rounded p-2 flex-1 w-40 text-gray-600 '> {t('D'+user.department.departmentId)}</div></div>
        </div>}

    </div>
    )
}
export default HomeUserData