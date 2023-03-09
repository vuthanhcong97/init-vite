import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import store from './redux'

const router = createBrowserRouter([
  {
    index: true,
    element: <App />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
