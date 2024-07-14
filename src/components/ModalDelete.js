import axios from 'axios';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
  } from '@chakra-ui/react';

export default function ModalDelete ({ id }) {
    const [open, setOpen] = useState(false);

    const { data, mutate } = useFetch('http://localhost:4000/?pesquisa=');

    const handleDelete = async (deleteItemId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/${deleteItemId}`);
            setOpen(false);
            mutate(data);

            toast.success(response.data.message);
        } catch (error) {
            console.error('Erro ao deletar:', error);
            toast.error('Erro ao deletar o usuário');
        }
    }

    return (
        <>
            <FaTrash className='cursor-pointer' onClick={() => setOpen(true)}/>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmação de Exclusão</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Deseja realmente excluir este usuário?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="ghost" onClick={() => handleDelete(id)}>
                            Excluir
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}