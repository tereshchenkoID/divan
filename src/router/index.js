import React, { lazy } from 'react'

const Home = lazy(() => import('pages/Home'))
const Live = lazy(() => import('pages/Live'))
const Viewer = lazy(() => import('pages/Viewer'))
export const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/viewer',
    element: <Viewer />,
  },
  {
    path: '/live',
    element: <Live />,
  },
]
