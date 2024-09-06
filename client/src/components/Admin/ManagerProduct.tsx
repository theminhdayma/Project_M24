import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../interface";
import { deleteProduct, getProducts } from "../../service/product.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ManagerProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

  // Filter products based on search term
  const filteredProducts = listProduct.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Change products per page
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleClick = () => {
    navigate("/addProduct");
  };

  const handleEdit = (productId: number) => {
    navigate(`/updateProduct/${productId}`);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Đã xóa thành công", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Hủy xóa sản phẩm", "error");
      }
    });
  };

  return (
    <>
      <div className="order">
        <div className="head">
          <div className="flex justify-center items-center gap-5">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2"
            />
            <i className="bx bx-search" />
          </div>
          <h3
            className="cursor-pointer border p-3 bg-blue-500 text-white flex justify-center items-center gap-3"
            onClick={handleClick}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <span>Thêm sản phẩm</span>
          </h3>
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
                <td>{indexOfFirstProduct + index + 1}</td> {/* Correct STT */}
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
        {/* Pagination */}
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
          <div className="flex gap-2">
            {Array.from(
              Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()
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
