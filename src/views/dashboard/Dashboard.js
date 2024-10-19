import React from 'react'
import ProtectedRoute from '../../api_service/ProtectedRoute'
import WidgetsDropdown from '../widgets/WidgetsDropdown'


const Dashboard = () => {

return (
    <>
    <ProtectedRoute>
      <WidgetsDropdown className="mb-4" />
    </ProtectedRoute>
    </>
  )
}

export default Dashboard
