import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { ProductContext } from "../context/ProductContext";

export default function AddProduct() {
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleAdd = (data) => {
    // data: { ten, danhMuc, gia, soLuong, moTa } (gia + soLuong are numbers)
    dispatch({ type: "ADD_PRODUCT", payload: data });
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Thêm sản phẩm mới</h2>
      <ProductForm onSubmit={handleAdd} />
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate(-1)}>↩ Quay lại</button>
      </div>
    </div>
  );
}
