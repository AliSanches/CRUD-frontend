import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from './Input';
import Enviar from './Enviar';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { mutate as mutateGlobal } from 'swr';

export default function Cadastro({ edit, setEdit }) {
    const ref = useRef();

    const { data } = useFetch('http://localhost:4000/?pesquisa=');

    useEffect(() => {
        if (edit) {
            const user = ref.current;

            user.nome.value = edit.name;
            user.idade.value = edit.idade;
            user.email.value = edit.email;
        }
         
    }, [edit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (!user.nome.value || !user.idade.value || !user.email.value) {
            return toast.warn("PREENCHA TODOS OS CAMPOS!");
        }

        if (edit) {
            console.log("Valor do id:", edit.id);
            const response = await axios.put("http://localhost:4000/" + edit.id, {
                name: user.nome.value,
                idade: user.idade.value,
                email: user.email.value,
            })
            mutateGlobal(data);

            if (response.status === 200) {
                toast.success(response.data.message);
            } else {
                toast.error("ERRO AO CADASTRAR!");
            }

        } else {
            const response = await axios.post("http://localhost:4000", {
                name: user.nome.value,
                idade: user.idade.value,
                email: user.email.value,
            })
            mutateGlobal(data);

            if (response.status === 200) {
                toast.success(response.data.message);
            } else {
                toast.error("ERRO AO CADASTRAR!");
            }
        }

        user.nome.value = "";
        user.idade.value = "";
        user.email.value = "";

        setEdit(null);
    }

    return (
        <form ref={ref} onSubmit={handleSubmit} className="h-28 w-3/4 bg-cyan-700 rounded-lg shadow-xl flex justify-center items-center">
            <Input name="nome" type="text" placeholder="Nome"/>
            <Input name="idade" type="number" placeholder="Idade"/> 
            <Input name="email" type="mail" placeholder="E-mail"/>
            <Enviar type="submit" />
        </form>
    );
}