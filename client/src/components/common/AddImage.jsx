import React, { useRef } from "react";
import { IoMdPhotos } from "react-icons/io";


const AddImage = ({ setImage, setPreview }) => {
  const fileInput = useRef(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(reader.result);
    setPreview(URL.createObjectURL(file));
  };
  
  return (
    <div className="flex">
      
      <div>
        <input
          type="file"
          className="hidden"
          ref={fileInput}
          accept="image/*"
          onChange={handleImage}
        />
        <IoMdPhotos
          className="text-2xl cursor-pointer"
          onClick={() => fileInput.current.click()}
        />
      </div>
    </div>
  );
};

export default AddImage;
