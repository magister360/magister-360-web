import { useState, useEffect } from "react";
import Image from "next/image";
import { StudentType } from "@/app/types/types";

interface ImagePhotoProps {
  studentFoto: StudentType | undefined;
  imageSrcPhoto: string;
  setImageSrcPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const ImagePhoto = ({ studentFoto,imageSrcPhoto, setImageSrcPhoto }: ImagePhotoProps) => {
  // const [imageSrcPhoto, setImageSrcPhoto] = useState("/notPhoto.png");

  useEffect(() => {
    if (studentFoto?.foto) {
      setImageSrcPhoto(`data:image/jpeg;base64,${studentFoto}`);
    }
  }, [studentFoto]);

  return (
    <div className="flex justify-center items-center mx-auto mt-4 w-[100px] h-[100px]">
      <Image
        className="object-cover rounded-lg"
        src={imageSrcPhoto}
        alt="foto"
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export default ImagePhoto;
