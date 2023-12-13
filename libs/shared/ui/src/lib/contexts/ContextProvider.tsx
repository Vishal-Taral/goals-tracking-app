import React, { useState } from 'react'
import AppContext from './AppContext'

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('')
  return (
    <AppContext.Provider value={{manage, setManage}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider
