import { useState, useEffect } from "react";

const Files = ({ keyy }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    let FileDown;
    try {
      FileDown = require(`../../../assets/images/uploads/file/${keyy.nameNewFile}`);
      if (FileDown) setFile(FileDown.default || FileDown);
    } catch (error) {
      console.error(error);
    }
  }, [keyy.nameNewFile]);

  console.log(keyy);
  
  return (
    <>
      <a href={file} download>
        {keyy.nameNewFile}
      </a>
    </>
  );
}

export default Files;