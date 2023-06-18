import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
export default function FrequentlyOpened({ myFiles, handleFileClick }) {
  const [frequentlyOpenedFiles, setFrequentlyOpenedFiles] = useState([]);

  useEffect(() => {
    const updatedFrequentlyOpenedFiles = myFiles
      .filter((file) => file.views > 0)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    setFrequentlyOpenedFiles(updatedFrequentlyOpenedFiles);
  }, [myFiles]);

  return (
    <div style={styles.frequentlyContainer}>
      <p style={styles.frequentlyTitle}>
        Frequently opened files ({frequentlyOpenedFiles.length})
      </p>
      <div style={styles.frequentlyBoxes}>
        {frequentlyOpenedFiles.length === 0 ? (
          <p style={{ color: "blue" }}>Open some files to show here</p>
        ) : (
          frequentlyOpenedFiles.map((file, idx) => {
            return file.views !== 0 ? (
              <div
                key={idx}
                style={styles.fileBox}
                onClick={() => handleFileClick(file)}
              >
                <div>
                  <p>{file.name}</p>
                </div>
                <div style={styles.views}>
                  <AiOutlineEye color="blue" size={20} />
                  <p style={{ color: "grey" }}>{file.views}</p>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  fileBox: {
    width: "100px",
    height: "100px",
    backgroundColor: "#eee",
    padding: "0.3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  views: {
    display: "flex",
    alignItems: "center",
    alignSelf: "end",
    gap: "5px",
  },
  frequentlyTitle: { fontWeight: "bold", paddingBottom: "0.5rem" },
  frequentlyContainer: { width: "100%", padding: 10 },
  frequentlyBoxes: { display: "flex", gap: "10px" },
};
