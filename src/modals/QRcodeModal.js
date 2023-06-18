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

  //thanks to the author of https://stackoverflow.com/questions/12168909/blob-from-dataurl for below code snippet
  const dataURLtoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={styles.modal}
    >
      <div style={styles.modalHeader}>
        <h2>Save QR Code</h2>
        <RxCross1 onClick={() => setIsModalOpen(false)} />
      </div>
      <div style={styles.modalContainer}>
        <QRCode
          style={styles.QRcode}
          includeMargin={true}
          id="qr-code"
          value={QRcodeUrl}
          renderAs="canvas"
        />
        <div style={{ textAlign: "center" }}>
          <p>{selectedFile && selectedFile.name}</p>
        </div>
        <div style={styles.saveButtonsContainer}>
          <button
            style={styles.saveButtons}
            onClick={() => handleSaveQRCode("svg")}
          >
            Save as SVG
          </button>
          <button
            style={styles.saveButtons}
            onClick={() => handleSaveQRCode("png")}
          >
            Save as PNG
          </button>
        </div>
      </div>
    </Modal>
  );
}

const styles = {
  saveButtons: {
    padding: "10px",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  saveButtonsContainer: {
    display: "flex",
    gap: "1.2rem",
    justifyContent: "center",
  },
  QRcode: {
    margin: "auto",
    border: "2px solid black",
    marginTop: "1rem",
  },
  modal: {
    content: {
      width: "400px",
      height: "330px",
      margin: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};
