import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";
import { RxCross1 } from "react-icons/rx";

const BASE_URL = "https://vishalgiri8888-file.web.app";

export default function QRcodeModal({
  selectedFile,
  isModalOpen,
  setIsModalOpen,
}) {
  const [QRcodeUrl, setQRcodeUrl] = useState(BASE_URL);
  useEffect(() => {
    if (selectedFile) setQRcodeUrl(`${BASE_URL}${selectedFile.path}`);
  }, [selectedFile]);

  const handleSaveQRCode = (format) => {
    const dataURL = document
      .getElementById("qr-code")
      .toDataURL(`image/${format}`);
    const blob = dataURLtoBlob(dataURL);
    saveAs(blob, `qr-code.${format}`);
  };

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={{
        content: {
          width: "400px",
          height: "330px",
          margin: "auto",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Save QR Code</h2>
        <RxCross1 onClick={() => setIsModalOpen(false)} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <QRCode
          style={{
            margin: "auto",
            border: "2px solid black",
            marginTop: "1rem",
          }}
          includeMargin={true}
          id="qr-code"
          value={QRcodeUrl}
          renderAs="canvas"
        />
        <div style={{ textAlign: "center" }}>
          <p>{selectedFile && selectedFile.name}</p>
        </div>
        <div
          style={{ display: "flex", gap: "1.2rem", justifyContent: "center" }}
        >
          <button
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleSaveQRCode("svg")}
          >
            Save as SVG
          </button>
          <button
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleSaveQRCode("png")}
          >
            Save as PNG
          </button>
        </div>
      </div>
    </Modal>
  );
}
