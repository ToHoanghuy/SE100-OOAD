import React, { useState, useEffect } from "react";

const ResidenceNote = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const changeImage = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * images.length);
      } while (newIndex === imageIndex); // Đảm bảo chỉ số mới khác với chỉ số cũ
      setImageIndex(newIndex);
    };

    const interval = setInterval(changeImage, Math.random() * (10000 - 5000) + 5000);


    return () => clearInterval(interval); // Cleanup interval khi component unmount
  }, [imageIndex, images]);

  return (
    <div className="residence_note zoomEffect">
      <img src={images[imageIndex]} alt={`Image ${imageIndex}`} />
    </div>
  );
};

export default ResidenceNote;