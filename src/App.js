import './App.css';
import { useState } from 'react';
import Cadastro from './components/Cadastro.js';
import Grid from './components/Grid.js';
import { ToastContainer } from 'react-toastify';

import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [edit, setEdit] = useState(null);

  return (
    <div className="App">
      <ChakraProvider>
        <Cadastro edit={edit} setEdit={setEdit} />
        <Grid setEdit={setEdit} />
        <ToastContainer autoClose={3000} position="bottom-left"/>
      </ChakraProvider>
    </div>
  );
}

export default App;