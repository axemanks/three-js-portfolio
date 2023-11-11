// Custom Hook for alerts - Extract logic for alerts
import React, { useState } from 'react'


const useAlert = () => {
    const [alert, setalert] = useState({show: false, text: '', type: 'danger'})
    // Show
    const showAlert = ({text, type = "danger"}) => setalert({
        show: true, 
        text, 
        type,
    })
    // Hide
    const hideAlert = () => setalert({
        show: false, 
        text: '', 
        type: 'danger'
    })

  return { alert, showAlert, hideAlert}
}

export default useAlert