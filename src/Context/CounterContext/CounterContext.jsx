import { createContext, useState } from "react"

export const createdContext =createContext()


export default function CounterContext({children}) {

const [counter,setCounter]=useState()

  return (
    <>
      <createdContext.Provider value={{counter , setCounter}} >{children}</createdContext.Provider>
    </>
  )
}
