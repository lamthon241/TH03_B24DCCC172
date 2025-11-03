import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

export default function Home() {
  const { products, dispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const categories = ["Tất cả", ...Array.from(new Set(products.map(p => p.danhMuc)))];

  
  const filtered = products.filter(p => {
    const matchName = p.ten.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Tất cả" || p.danhMuc === category;
    return matchName && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filtered.length, totalPages, currentPage]);

  const start = (currentPage - 1) * itemsPerPage;
  const currentProducts = filtered.slice(start, start + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1>📦 Quản lý sản phẩm</h1>
        <button onClick={() => navigate("/add")} style={{ padding: "8px 12px" }}>+ Thêm sản phẩm</button>
      </div>

      <SearchFilter
        search={search}
        setSearch={(v) => { setSearch(v); setCurrentPage(1); }}
        category={category}
        setCategory={(v) => { setCategory(v); setCurrentPage(1); }}
        categories={categories}
      />

      <div>
        {currentProducts.length === 0 ? (
          <p>Không có sản phẩm nào phù hợp.</p>
        ) : (
          currentProducts.map(p => (
            <ProductCard key={p.id} product={p} onDelete={handleDelete} />
          ))
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <p style={{ marginTop: 8, fontSize: 14 }}>
          Tổng sản phẩm: {filtered.length} — Trang {currentPage}/{totalPages}
        </p>
      </div>
    </div>
  );
}
