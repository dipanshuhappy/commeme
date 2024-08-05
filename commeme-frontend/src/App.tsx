import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { usePrivy } from '@privy-io/react-auth';

function App() {
  const {ready, authenticated, login} = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  return (
    <>
     <Button  disabled={disableLogin} onClick={login}> Login </Button>
    </>
  )
}

export default App
