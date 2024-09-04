import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from '../components/Loader';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Por favor selecione um avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem('chat-app-user')
            );

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Erro ao atualizar avatar. Por favor tente novamente!", toastOptions);
            }
        }
    };

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];

            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );

                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setLoading(false);
        };

        fetchAvatars();
    }, []);

    return (
        <>
            {
                loading 
                    ? 
                <Container>
                    <Loader className="loader" />
                </Container>
                    : (


                <Container>
                    <div className='title-container'>
                        <h1>Escolha um avatar</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`avatar ${
                                        selectedAvatar === index ? "selected" : ""
                                    }`}
                                >
                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    key={avatar}
                                    onClick={() => setSelectedAvatar(index)}
                                />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className='submit-btn'
                        onClick={setProfilePicture}
                    >
                        Selecionar Avatar
                    </button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #333;
    height: 100vh;
    width: 100vw;
    .title-container {
        h1 {
            color: #ff3333;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #f3f3f3;
        }
    }
    .submit-btn {
        background-color: #ff3333;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #a51e1e;
            transition: 0.2s ease-in-out;
        }
`;