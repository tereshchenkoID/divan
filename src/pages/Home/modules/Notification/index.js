import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { setNotification } from 'store/HOME/actions/notificationAction'

const Notification = ({ data }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      toast(data.text, {
        type: data.type,
        onClose: () => dispatch(setNotification(null)),
      })
    }
  }, [data])

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  )
}

export default Notification
