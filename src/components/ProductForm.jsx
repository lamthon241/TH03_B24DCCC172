import React, { useState } from "react";

export default function ProductForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(
    initialData || { ten: "", danhMuc: "", gia: "", soLuong: "", moTa: "" }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (formData.ten.trim().length < 3) e.ten = "Tên sản phẩm tối thiểu 3 ký tự";
    if (!formData.danhMuc) e.danhMuc = "Phải chọn danh mục";
    if (!formData.gia || formData.gia <= 0) e.gia = "Giá phải là số dương";
    if (!formData.soLuong || formData.soLuong <= 0) e.soLuong = "Số lượng phải là số nguyên dương";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, gia: Number(formData.gia), soLuong: Number(formData.soLuong) });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Tên sản phẩm" value={formData.ten} onChange={e => setFormData({ ...formData, ten: e.target.value })}/>
      {errors.ten && <p className="error">{errors.ten}</p>}

      <select value={formData.danhMuc} onChange={e => setFormData({ ...formData, danhMuc: e.target.value })}>
        <option value="">-- Chọn danh mục --</option>
        <option>Điện tử</option>
        <option>Quần áo</option>
        <option>Đồ ăn</option>
        <option>Sách</option>
        <option>Khác</option>
      </select>
      {errors.danhMuc && <p className="error">{errors.danhMuc}</p>}

      <input type="number" placeholder="Giá" value={formData.gia} onChange={e => setFormData({ ...formData, gia: e.target.value })}/>
      {errors.gia && <p className="error">{errors.gia}</p>}

      <input type="number" placeholder="Số lượng" value={formData.soLuong} onChange={e => setFormData({ ...formData, soLuong: e.target.value })}/>
      {errors.soLuong && <p className="error">{errors.soLuong}</p>}

      <textarea placeholder="Mô tả" value={formData.moTa} onChange={e => setFormData({ ...formData, moTa: e.target.value })}></textarea>

      <button type="submit">Lưu</button>
    </form>
  );
}
