import { FaEdit } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from './ModalDelete';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function Grid({ setEdit }) {

    const [pesquisa, setPesquisa] = useState('');
    
    const { data, error } = useFetch(`http://localhost:4000/?pesquisa=${pesquisa}`, {
        keepPreviousData: true,
    });

    const handleEdit = (item) => {
        setEdit(item);
    }

    if (error) {
        return ( 
            <div className="h-3/4 w-3/4 bg-stone-50 rounded-lg shadow-xl flex justify-center items-center">
                <div className='h-96 w-96 bg-violet-600 shadow-xl rounded-full flex items-center justify-center'>
                    <h1 className='text-center text-zinc-50'>CONEXÃO NÃO ESTABELECIDA</h1>
                </div>
            </div>
        );
    } 
    return (
        <div className="h-3/4 w-3/4 bg-cyan-700 rounded-lg shadow-xl">
            <div className='ml-auto mr-auto w-1/5 mt-6'>
                <input placeholder="Buscar por nome" name="pesquisa" value={pesquisa} onChange={event => setPesquisa(event.target.value)} className='p-3 rounded-lg shadow-xl' />
            </div>
            
            {data ? <table className="min-w-full text-center">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Idade</th>
                        <th className="px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, indice) => (
                        <tr key={indice}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.idade}</td>
                            <td className="border px-4 py-2">{item.email}</td>
                            <td className="border px-4 py-2"><FaEdit className='cursor-pointer' onClick={() => handleEdit(item)} /></td>
                            <td className="border px-4 py-2"><ModalDelete id={item.id} /></td>
                        </tr>
                    ))}
                </tbody>
            </table> : null}
        </div>
    );
}