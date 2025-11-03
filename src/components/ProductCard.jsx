import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h2>{product.ten}</h2>
      <p><strong>Giá:</strong> {product.gia.toLocaleString()}đ</p>
      <p><strong>Danh mục:</strong> {product.danhMuc}</p>
      <p><strong>Tồn kho:</strong> {product.soLuong}</p>
      <div>
        <button onClick={() => navigate(`/product/${product.id}`)}>Chi tiết</button>
        <button onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
        <button onClick={() => onDelete(product.id)}>Xóa</button>
      </div>
    </div>
  );
}
