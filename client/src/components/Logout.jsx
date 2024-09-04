import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Button>
            <BiPowerOff onClick={handleClick} />
        </Button>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #ff3333;
    border: none;
    cursor: pointer;
    color: #f3f3f3;
`;