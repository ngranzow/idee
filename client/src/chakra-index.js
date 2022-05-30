//CHALKRA PROVIDER SETUP
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './chakra-app'

// 1. import `ChakraProvider` component
//ColorModeScript to change from dark mode ot light mode
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app

  return (
    <React.StrictMode>

    <ChakraProvider> 

        <ColorModeScript initialColorMode='light'></ColorModeScript>

      <App />
    </ChakraProvider>

    </React.StrictMode>
  )
}



