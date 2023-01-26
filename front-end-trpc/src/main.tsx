import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
       <RouterProvider router={router}/>
     </QueryClientProvider>
)
