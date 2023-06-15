import React from "react";
import { AiOutlineEye } from "react-icons/ai";
export default function FrequentlyOpened({ myFiles }) {
  let frequentlyOpenedFiles = myFiles
    .filter((file) => file.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div style={{ width: "100%", padding: 10 }}>
      <p style={{ fontWeight: "bold", paddingBottom: "0.5rem" }}>
        Frequently opened files
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        {frequentlyOpenedFiles.length === 0 ? (
          <p style={{ color: "blue" }}>Open some files to show here</p>
        ) : (
          frequentlyOpenedFiles.map((file, idx) => {
            return file.views !== 0 ? (
              <div
                key={idx}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#eee",
                  padding: "0.3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>{file.name}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "end",
                    gap: "5px",
                  }}
                >
                  <AiOutlineEye color="blue" size={20} />
                  <p>{file.views}</p>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>
    </div>
  );
}