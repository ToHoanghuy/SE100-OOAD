import React, { useState, useEffect, useRef } from 'react';

const GalleryPopUp = ({ name, images, closePopup,clickImg }) => {
    const [thisImg, setThisImg] = useState(clickImg);
    const [width, setWidth] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const imgsRefs = useRef([]);

    const setCenterImg = (imgIndex) => {
        setThisImg(imgIndex);
        document.getElementById('currnet_image_order').textContent = imgIndex + 1;
    };

    const MoveNext = () => {
        var img = imgsRefs.current;
        var img_Margin = parseInt(window.getComputedStyle(img[0]).marginRight, 10);
        var imgWidth;
        var imgLength;
        if (thisImg > 3 && thisImg < (img.length - 5)) {
         
            imgLength = img[thisImg - 4].offsetWidth + 2 * img_Margin;
            imgWidth = width + imgLength;
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
        }
        else if (thisImg == img.length - 1) {
            imgWidth = 0;
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
            // return
        }
        else if (thisImg >= (img.length - img.length/2)) {
            // alert('hi')
            imgLength = img[thisImg - 4].offsetWidth + 2 * img_Margin;
            imgWidth = width + imgLength;
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
        }
    };
    const MovePrev = () => {
        var img = imgsRefs.current;
        var img_Margin = parseInt(window.getComputedStyle(img[0]).marginRight, 10);
        var imgWidth;
        var imgLength;
        if (thisImg > 3) {
            imgLength = img[thisImg - 4].offsetWidth + 2 * img_Margin;
            imgWidth = width - imgLength;
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
        }
        else if (thisImg < 4 && thisImg != 0) {
            imgWidth = 0;
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
        }
        else if (thisImg == 0) {
            imgWidth = width;
            for (let j = 0; j < img.length - 5; j++) {
                imgLength = img[j].offsetWidth + 2 * img_Margin;
                imgWidth = imgWidth + imgLength;
            }
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
        }
    };

    useEffect(() => {
        handleImageClick (clickImg)
    }, [clickImg]);

    const handleClose = () => {
        closePopup(); // Gọi hàm đóng popup từ component cha
    };

    const handleNext = () => {
        if (thisImg === images.length - 1) {
            setThisImg(0);
        } else {
            setThisImg(thisImg + 1);
        }
        MoveNext()
    };

    const handlePrev = () => {
        if (thisImg === 0) {
            setThisImg(images.length - 1);
        } else {
            setThisImg(thisImg - 1);
        }
        MovePrev()
    };

    const handleImageClick = (index) => {
        setCenterImg(index);
        if (index > 3) {
            var img = imgsRefs.current;
            var img_Margin = parseInt(window.getComputedStyle(img[0]).marginRight, 10);
            var imgLength;
            var imgWidth=0;
            for (let j = 0; j < index - 4; j++) {
                imgLength = img[j].offsetWidth + 2 * img_Margin;
                imgWidth = imgWidth + imgLength;
            }
            setWidth(imgWidth)
            imgsRefs.current.forEach((img, index) => {
                img.style.transform = `translateX(-${imgWidth}px)`;
            });
        }
    };

    return (
        <div>
            <div className="overlay" onClick={handleClose}></div>
            <div className="gallery_pop_up_frame">
                <div className="gallery_pop_up_frame_header">
                    <span>{name}</span>
                    <div className="close_pop_up" onClick={handleClose}>
                        <span>Đóng</span><i className="fa-solid fa-x"></i>
                    </div>
                </div>
                <div className="gallery_pop_up_frame_body">
                    <div className="pop_up_left">
                        <div className="pop_up_btn_move" onClick={handlePrev}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                    </div>
                    <div className="pop_up_middle">
                        <img id="img_center" src={images[thisImg].url} alt="center" />
                    </div>
                    <div className="pop_up_right">
                        <div className="pop_up_btn_move" onClick={handleNext}>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </div>
                <div className="gallery_pop_up_frame_footer">
                    <div className="image_order">
                        <span className="currnet_image_order" id="currnet_image_order">{thisImg + 1}</span>
                        /
                        <span className="all_image_order" id="all_image_order">{images.length}</span>
                    </div>
                    <div className="list_of_image">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                className={`detail_img ${index === thisImg ? 'this_img' : ''}`}
                                src={img.url}
                                alt={`detail-${index}`}
                                onClick={() => handleImageClick(index)}
                                ref={(el) => (imgsRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryPopUp;