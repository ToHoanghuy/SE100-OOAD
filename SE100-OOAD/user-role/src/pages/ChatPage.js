import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../styles/ChatPage.css';
import '../styles/Chat.css';

function ChatPage() {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State để hiển thị emoji picker
    const chatBodyRef = useRef(null);
    const inputRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const hotels = [
        { id: 1, name: 'Khách sạn Hoàng Huy', messages: [{ text: 'Hello', type: 'hotel' }, { text: 'Call API chưa HN ơi', type: 'hotel' }] },
        { id: 2, name: 'Khách sạn Thịnh Phúc', messages: [{ text: 'Bạn cần giúp đỡ điều gì', type: 'hotel' }] },
        { id: 3, name: 'Khách sạn Trúc Mộng', messages: [{ text: 'Chết rồi', type: 'hotel' }, { text: 'Bé quên nộp deadline', type: 'hotel' }] },
    ];

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Tự động focus vào input
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji); // Thêm emoji vào nội dung tin nhắn
        setShowEmojiPicker(false); // Ẩn emoji picker sau khi chọn
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [hotels]);

    const handleHotelClick = (hotel) => {
        setSelectedHotel(hotel);
    };

    const handleSendMessage = () => {
        if (message.trim() === '') return;

        if (selectedHotel) {
            selectedHotel.messages.push({ text: message, type: 'user' });
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
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
    

    return (
        <div className="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Lịch sử trao đổi</span>
            </div>
            <div className="user_content_section user_section_frame">
                <div className="user_chat_frame OpacityEffect">
                    {/* Danh sách khách sạn */}
                    <div className="user_chat_frame_left">
                        {hotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                className={`hotel_item ${selectedHotel?.id === hotel.id ? 'active' : ''}`}
                                onClick={() => handleHotelClick(hotel)}
                            >
                                {hotel.name}
                            </div>
                        ))}
                    </div>

                    {/* Chi tiết tin nhắn */}
                    <div className="user_chat_frame_right">
                        {selectedHotel ? (
                            <div className="chat_container">
                                <div className="chat_header">
                                    <h3>
                                        <i className="fa-solid fa-comment-dots" onClick={handleIconClick}></i>
                                        {selectedHotel.name}
                                    </h3>
                                </div>
                                <div className="chat_body" ref={chatBodyRef}>
                                    {selectedHotel.messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`chat_message ${msg.type}`}
                                        >
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="chat_footer">
                                    {/* Nút Emoji */}
                                    <div className='chat_footer_input'>
                                        <input
                                            className='chat_input'
                                            type="text"
                                            placeholder="Nhập nội dung..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
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
                                            <EmojiPicker locale="vi" onEmojiClick={handleEmojiClick} />
                                        </div>
                                    )}
                                    <button
                                        className='send_mess_btn'
                                        onClick={handleSendMessage}
                                        disabled={isSending}
                                    >
                                        <i class="fa-solid fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="no_selection">Vui lòng chọn một khách sạn để xem chi tiết tin nhắn.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;