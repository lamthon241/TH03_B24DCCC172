import React from "react";

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "5px" }}>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>⬅ Trước</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)} style={{
          background: currentPage === i + 1 ? "#007bff" : "white",
          color: currentPage === i + 1 ? "white" : "black"
        }}>{i + 1}</button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Tiếp ➡</button>
    </div>
  );
}
