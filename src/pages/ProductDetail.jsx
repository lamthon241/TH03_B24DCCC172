import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, dispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));
  if (!product) {
    return (
      <div className="container">
        <p>Không tìm thấy sản phẩm.</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Xóa sản phẩm này?")) {
      dispatch({ type: "DELETE_PRODUCT", payload: product.id });
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2>{product.ten}</h2>
      <p><strong>Danh mục:</strong> {product.danhMuc}</p>
      <p><strong>Giá:</strong> {product.gia.toLocaleString()}đ</p>
      <p><strong>Số lượng:</strong> {product.soLuong}</p>
      <p><strong>Mô tả:</strong> {product.moTa}</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>Xóa</button>
        <button onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Quay lại</button>
      </div>
    </div>
  );
}
