import React, { createContext, useReducer, useEffect } from "react";

const sampleProducts = [
  { id: 1, ten: "iPhone 15 Pro", danhMuc: "Điện tử", gia: 25000000, soLuong: 10, moTa: "Điện thoại cao cấp của Apple" },
  { id: 2, ten: "Áo Thun Nam", danhMuc: "Quần áo", gia: 150000, soLuong: 50, moTa: "Áo thun cotton thoáng mát" },
  { id: 3, ten: "Cơm Gà", danhMuc: "Đồ ăn", gia: 50000, soLuong: 100, moTa: "Cơm gà xối mỡ giòn tan" },
  { id: 4, ten: "MacBook Air", danhMuc: "Điện tử", gia: 28000000, soLuong: 5, moTa: "Laptop nhẹ và bền" },
  { id: 5, ten: "Giày Thể Thao", danhMuc: "Quần áo", gia: 700000, soLuong: 20, moTa: "Phù hợp chạy bộ và đi chơi" },
  { id: 6, ten: "Bánh Mì", danhMuc: "Đồ ăn", gia: 15000, soLuong: 200, moTa: "Bánh mì pate thơm ngon" },
  { id: 7, ten: "Sách Lịch Sử", danhMuc: "Sách", gia: 90000, soLuong: 30, moTa: "Kiến thức lịch sử Việt Nam" },
  { id: 8, ten: "Tai Nghe Bluetooth", danhMuc: "Điện tử", gia: 350000, soLuong: 15, moTa: "Kết nối không dây, âm thanh tốt" },
  { id: 9, ten: "Mì Cay", danhMuc: "Đồ ăn", gia: 40000, soLuong: 60, moTa: "Mì cay cấp độ 7" },
  { id: 10, ten: "Balo Laptop", danhMuc: "Khác", gia: 300000, soLuong: 25, moTa: "Balo chống sốc, thời trang" },
];

export const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, { ...action.payload, id: Date.now() }];
    case "UPDATE_PRODUCT":
      return state.map(p => (p.id === action.payload.id ? action.payload : p));
    case "DELETE_PRODUCT":
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const storedData = localStorage.getItem("products");
  const initialData = storedData ? JSON.parse(storedData) : sampleProducts;
  const [products, dispatch] = useReducer(productReducer, initialData);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
