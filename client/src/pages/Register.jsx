import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/icon.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { registerRoute } from '../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            const { username, email, password } = values;

            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

    const handleValidation = () => {
        const { password, passwordConfirm, username, email } = values;
        if (password !== passwordConfirm) {
            toast.error('As senhas não coincidem', toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error('O nome deve ter no mínimo 3 caracteres', toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error('A senha deve ter no mínimo 8 caracteres', toastOptions);
            return false;
        } else if (email === "") {
            toast.error('O email não pode estar vazio', toastOptions);
            return false;
        }
        return true;
    } 

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                        <h1>Chat</h1>
                    </div>
                    <input
                        type='text'
                        placeholder='Nome'
                        name='username'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Senha'
                        name='password'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Confirme a senha'
                        name='passwordConfirm'
                        onChange={(e) => handleChange(e)}
                    />
                    <button 
                        type='submit'
                    >
                        Cadastrar
                    </button>
                    <span>Já possui uma conta? <Link to='/login'>Entrar</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #333;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: #ff3333;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #f3f3f3;
            border-radius: 0.4rem;
            color: #f3f3f3;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #ff3333;
                outline: none;
            }
        }
        button {
            background-color: #ff3333;
            color: #f3f3f3;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.2s ease-in-out;
            &:hover {
                background-color: #a51e1e;
            }
        }
        span {
            color: #f3f3f3;
            text-transform: uppercase;
            a {
                color: #ff3333;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Register;