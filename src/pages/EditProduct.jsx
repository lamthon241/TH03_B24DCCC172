import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { ProductContext } from "../context/ProductContext";

export default function EditProduct() {
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

  const handleUpdate = (data) => {
    // ensure id included
    dispatch({ type: "UPDATE_PRODUCT", payload: { ...data, id: product.id } });
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initialData={product} onSubmit={handleUpdate} />
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate(-1)}>↩ Quay lại</button>
      </div>
    </div>
  );
}
