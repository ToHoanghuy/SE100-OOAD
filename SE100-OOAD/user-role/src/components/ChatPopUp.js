// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/Chat.css';

// function ChatPopUp({ closeChatPopUp }) {
//     const [messages, setMessages] = useState([
//         { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn?', sender: 'hotel' },
//         { id: 2, text: 'Code đồ án giúp tôi được không.', sender: 'user' }
//     ]);
//     const [inputMessage, setInputMessage] = useState('');
//     const chatBodyRef = useRef(null);

//     const handleSendMessage = () => {
//         if (inputMessage.trim() !== '') {
//             setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: 'user' }]);
//             setInputMessage('');
//         }
//     };

//     const handleCloseChat = () => {
//         closeChatPopUp()
//     };

//     useEffect(() => {
//         if (chatBodyRef.current) {
//             chatBodyRef.current.scrollTo({
//                 top: chatBodyRef.current.scrollHeight,
//                 behavior: 'smooth',
//             });
//         }
//     }, [messages]);

//     return (
//         <div>
//             {/* <div className="overlay" onClick={handleCloseChat}></div> */}
//             <div className="chat_pop_up">
//                 <div className='chat_header'>
//                     <span>Tên khách sạn</span>
//                     <i class="fa-solid fa-x" onClick={handleCloseChat}></i>
//                 </div>
//                 <div className='chat_body' ref={chatBodyRef}>
//                     {messages.map((message) => (
//                         <div key={message.id} className={`chat_message ${message.sender}`}>
//                             {message.text}
//                         </div>
//                     ))}
//                 </div>
//                 <div className='chat_footer'>
//                     {/* <input
//                             type="text"
//                             placeholder="Nhập nội dung..."
//                             value={inputMessage}
//                             onChange={(e) => setInputMessage(e.target.value)}
//                             onKeyPress={(e) => {
//                                 if (e.key === 'Enter') handleSendMessage();
//                             }}
//                         />
//                         <button onClick={handleSendMessage}>Gửi</button>

//                          */}
//                     <div className='chat_footer_input'>
//                         <input
//                             className='chat_input'
//                             type="text"
//                             placeholder="Nhập nội dung..."
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             onKeyDown={handleKeyDown}
//                             ref={inputRef}
//                         />
//                         <button
//                             className="emoji_button"
//                             onClick={() => setShowEmojiPicker((prev) => !prev)}
//                         >
//                             😊
//                         </button>
//                     </div>

//                     {showEmojiPicker && (
//                         <div className="emoji_picker_container">
//                             <EmojiPicker onEmojiClick={handleEmojiClick} />
//                         </div>
//                     )}
//                     <button
//                         className='send_mess_btn'
//                         onClick={handleSendMessage}
//                         disabled={isSending}
//                     >
//                         Gửi
//                     </button>
//                 </div>
//                 {/* </div> */}
//             </div>
//         </div>
//     );
// }

// export default ChatPopUp;

import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chat.css';
import EmojiPicker from 'emoji-picker-react'; // Đảm bảo bạn có thư viện emoji-picker-react

function ChatPopUp({ closeChatPopUp }) {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn?', sender: 'hotel' },
        { id: 2, text: 'Code đồ án giúp tôi được không.', sender: 'user' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatBodyRef = useRef(null);
    const inputRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: 'user' }]);
            setInputMessage('');
            setShowEmojiPicker(false); // Ẩn emoji picker sau khi gửi
        }
    };

    const handleCloseChat = () => {
        closeChatPopUp();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setInputMessage((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false); // Ẩn emoji picker sau khi chọn
    };

    // Khi click ra ngoài thì đóng emojicontainer
    const handleOutsideClick = (event) => {
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target) &&
            !inputRef.current.contains(event.target)
        ) {
            setShowEmojiPicker(false);
        }
    };
    useEffect(() => {
        // Add event listener to close emoji picker on outside click
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

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
            <div className="chat_pop_up">
                <div className='chat_header'>
                    <span>Tên khách sạn</span>
                    <i className="fa-solid fa-x" onClick={handleCloseChat}></i>
                </div>
                <div className='chat_body' ref={chatBodyRef}>
                    {messages.map((message) => (
                        <div key={message.id} className={`chat_message ${message.sender}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className='chat_footer'>
                    <div className='chat_footer_input'>
                        <input
                            className='chat_input'
                            type="text"
                            placeholder="Nhập nội dung..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                        />
                        <button
                            className="emoji_button"
                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                        >
                            <i class="fa-solid fa-face-smile"></i>
                        </button>
                    </div>

                    {showEmojiPicker && (
                        <div className="emoji_picker_container" ref={emojiPickerRef}>
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                    <button
                        className='send_mess_btn'
                        onClick={handleSendMessage}
                    >
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPopUp;