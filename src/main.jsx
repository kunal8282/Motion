import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import {Provider} from "react-redux"
import store from "./store/store"
import browserRouter from './utils/browserRouterConfig'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router = {browserRouter} />
    </Provider>
  </React.StrictMode>,
)
