import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'

import { MyContext } from './hooks/myContext'

import { Routes } from './routes'

import theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <GlobalStyles/>

      <MyContext.Provider value={{nome: "Alexandre",email: 'alexandre@alexandre.com'}} >
        <Routes/>
      </MyContext.Provider>
        
    </ThemeProvider>

  </React.StrictMode>,
)
