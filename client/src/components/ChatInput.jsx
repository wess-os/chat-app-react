import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput() {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container">
                <input 
                    type="text" 
                    placeholder='Digite sua mensagem...' 
                    value={msg} 
                    onChange={(e) => setMsg(e.target.value)} 
                />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #00000076;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: #f3f3f3;
        gap: 1rem;
        .emoji {
            position: relative;
            font-size: 1.5rem;
            color: #ff3333;
            cursor: pointer;
            .EmojiPickerReact {
                position: absolute;
                top: -470px;
                background-color: #fff;
                box-shadow: 0 5px 10px #ff3333;
                border-color: #ff3333;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #9a86f3;
                    }
                }
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border-color: #9a86f3;
                }
                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #00000076;
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: #f3f3f3;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #ff3333;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ff3333;
            border: none;
            font-size: 2rem;
            color: #f3f3f3;
            cursor: pointer;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                font-size: 1rem;
            }
        }
    }
`;