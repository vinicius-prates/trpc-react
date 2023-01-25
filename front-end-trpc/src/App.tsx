import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import './App.css'
import { api } from './util/trpc';


function App() {
  const { data, isLoading, isError } = useQuery(['getSneakers'], () => api.allSneaker.query())

  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Something went wrong...</div>
  }
  
  return (
    <div>
      <h1>dale</h1>
      <p>{JSON.stringify(data?.allSneakers[1].sneakername)}</p>

    </div>
  )
}

export default App
