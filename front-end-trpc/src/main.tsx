import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddSneaker } from './pages/AddSneaker'
import { NewUser } from './pages/NewUser'
import { LogIn } from './pages/LogIn'
 
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
  },
  {
    path:"/add-sneaker",
    element:<AddSneaker/>
  }, 
  {
    path:"/register",
    element: <NewUser/>
  },
  {
    path:"/login",
    element:<LogIn/>
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
       <RouterProvider router={router}/>
     </QueryClientProvider>
)
