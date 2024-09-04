import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectChat from '../assets/select-chat.png';

export default function Welcome() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            const user = JSON.parse(localStorage.getItem('chat-app-user'));
            if (user && user.username) {
                setUserName(user.username);
            }
        };

        fetchUserName();
    }, []);

    return (
        <Container>
            <img src={SelectChat} alt="select-chat" />
            <h1>
                Bem Vindo, <span>{userName}!</span>
            </h1>
            <h3>Por favor, escolha um chat/grupo para conversar.</h3>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #f3f3f3;
    img {
        height: 20rem;
    }
    span {
        color: #ff3333;
    }
`;