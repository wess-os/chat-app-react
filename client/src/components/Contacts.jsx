import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/icon.png';

export default function Contacts({ contacts, changeChat }) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = localStorage.getItem('chat-app-user');
            if (userData) {
                const data = JSON.parse(userData);
                setCurrentUsername(data.username);
                setCurrentUserAvatar(data.avatarImage);
            }
        };
    
        fetchUserData();
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {currentUserAvatar && currentUserAvatar && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Chat</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                        return (
                            <div
                            key={contact._id}
                            className={`contact ${
                                index === currentSelected ? "selected" : ""
                            }`}
                            onClick={() => changeCurrentChat(index, contact)}
                            >
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                    alt=""
                                />
                            </div>
                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentUserAvatar}`}
                            alt="avatar"
                        />
                        </div>
                        <div className="username">
                            <h2>{currentUsername}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );

}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #00000076;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 2rem;
        }
        h3 {
            color: #ff3333;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #00000076;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.2s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
        .selected {
            background-color: #ffffff34;
        }
    }
    .current-user {
        background-color: #111111;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;