import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatFrame.css';

function ChatFrame({ closeChatFrame }) {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn?', sender: 'hotel' },
        { id: 2, text: 'Code đồ án giúp tôi được không.', sender: 'user' },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const chatBodyRef = useRef(null);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: 'user' }]);
            setInputMessage('');
        }
    };

    const handleCloseChat = () => {
        closeChatFrame()
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    return (
        <div>
            {/* <div className="overlay" onClick={handleCloseChat}></div> */}
            <div className="chat_frame">
                <div className='chat_frame_left'>
                    <i className="fa-solid fa-angle-right"
                        onClick={() => handleCloseChat()}
                    ></i>
                </div>
                <div className='chat_frame_right'>
                    <div className='chat_header'>
                        <span>Tên khách sạn</span>
                    </div>
                    <div className='chat_body' ref={chatBodyRef}>
                        {messages.map((message) => (
                            <div key={message.id} className={`chat_message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className='chat_footer'>
                        <input
                            type="text"
                            placeholder="Nhập nội dung..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                        />
                        <button onClick={handleSendMessage}>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatFrame;