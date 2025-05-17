import React, { createContext, StrictMode, useState, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


export const Context = createContext({ isAuthorized: false });

export const InterviewContext = createContext();


const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [interviewInfo, setInterviewInfo] = useState({});
  const [user, setUser] = useState({})
  return (
    <InterviewContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
        <App />
      </Context.Provider>
    </InterviewContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <AppWrapper />,
)
