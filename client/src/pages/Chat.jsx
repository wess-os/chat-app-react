import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = localStorage.getItem('chat-app-user');
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(JSON.parse(user));
        setLoader(true);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        } else {
          navigate('/setAvatar');
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} changeChat={handleChangeChat} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #333;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;