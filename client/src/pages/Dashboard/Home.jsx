import React from 'react'
import DashboardLayout from '../../Components/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

const Home = () => {
  useUserAuth()
  return (
    <div>
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-6 mx-auto'>Home</div>
    </DashboardLayout>
    </div>
  )
}

export default Home