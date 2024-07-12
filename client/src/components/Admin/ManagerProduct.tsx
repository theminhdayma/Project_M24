import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../interface";
import { deleteProduct, getProducts } from "../../service/product.service";
import { useNavigate } from "react-router-dom";

export default function ManagerProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5); // Số lượng sản phẩm trên mỗi trang

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

  // Lấy sản phẩm hiện tại trên trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Thay đổi số bản ghi trên mỗi trang
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset lại trang về trang đầu tiên khi thay đổi số bản ghi trên mỗi trang
  };

  const handleClick = () => {
    navigate("/addProduct");
  };

  const handleEdit = (productId: number) => {
    navigate(`/updateProduct/${productId}`);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="order">
        <div className="head">
          <h3
            className="cursor-pointer border p-3 bg-blue-500 text-white flex justify-center items-center gap-3"
            onClick={handleClick}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <span>Thêm sản phẩm</span>
          </h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Hãng</th>
              <th>Số lượng</th>
              <th>Giá(USD)</th>
              <th>Lượt mua</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[400px]">
            {currentProducts.map((product: ProductType, index: number) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.total}</td>
                <td>{product.price}</td>
                <td>{product.purchaseCount}</td>
                <td className="flex gap-2">
                  <button
                    className="button update"
                    onClick={() => handleEdit(product.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="button delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Phân trang */}
        <div className="w-full p-3 flex justify-end items-center gap-2">
          <div>
            <select
              className="border border-gray-800"
              name="productsPerPage"
              id="productsPerPage"
              value={productsPerPage}
              onChange={handlePerPageChange}
            >
              <option value="5">5 bản ghi</option>
              <option value="10">10 bản ghi</option>
              <option value="15">15 bản ghi</option>
              <option value="20">20 bản ghi</option>
            </select>
          </div>
          <div  className="flex gap-2">
            {Array.from(
              Array(Math.ceil(listProduct.length / productsPerPage)).keys()
            ).map((number, index) => (
              <button
                key={index}
                className={`border border-gray-950 p-1 ${
                  currentPage === number + 1 ? "bg-gray-200" : ""
                }`}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
