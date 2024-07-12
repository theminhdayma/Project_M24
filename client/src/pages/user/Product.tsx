import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Category, ProductType } from "../../interface";
import { useEffect, useState } from "react";
import { getAllCategory, getProducts } from "../../service/product.service";

export default function Product() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  // Fetch products and categories from Redux store
  const listProduct: ProductType[] = useSelector(
    (state: any) => state.product.product
  );
  const listCategory: Category[] = useSelector(
    (state: any) => state.product.category
  );

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
    dispatch(getAllCategory());
  }, [dispatch, currentPage, productsPerPage]);

  // Filtered products based on selected category, brand, and price range
  const filteredProducts = listProduct.filter((product: ProductType) => {
    const filterByCategory =
      selectedCategory === "" ||
      product.idCategory.toString() === selectedCategory;
    const filterByBrand =
      selectedBrand === "" || product.brand === selectedBrand;

    let filterByPrice = true;
    if (selectedPriceRange !== "") {
      const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
      filterByPrice = product.price >= minPrice && product.price <= maxPrice;
    }

    return filterByCategory && filterByBrand && filterByPrice;
  });

  // Calculate current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Total number of pages
  const pageNumbers = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle change in products per page
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing products per page
  };

  // Handle pagination click
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1); // Reset to first page when changing brand
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(e.target.value);
    setCurrentPage(1); // Reset to first page when changing price range
  };

  return (
    <>
      <HeaderUser />
      <main className="main">
        <nav>
          <div className="filter-sort">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Tất cả sản phẩm</option>
              {listCategory.map((category: Category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
            <select value={selectedBrand} onChange={handleBrandChange}>
              <option value="">Tất cả các hãng</option>
              {listProduct &&
                listProduct.length > 0 &&
                listProduct
                  .map((product) => product.brand)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
            </select>
            <select
              value={selectedPriceRange}
              onChange={handlePriceRangeChange}
            >
              <option value="">Tất cả giá</option>
              <option value="0-100">0 - 100 USD</option>
              <option value="100-200">100 - 200 USD</option>
              <option value="200-300">200 - 300 USD</option>
              <option value="300-400">300 - 400 USD</option>
              <option value="400-500">400 - 500 USD</option>
              <option value="500-600">500 - 600 USD</option>
              <option value="600-700">600 - 700 USD</option>
              <option value="700-800">700 - 800 USD</option>
              <option value="800-900">800 - 900 USD</option>
            </select>
          </div>
        </nav>
        <section className="product-list">
          <div className="container">
            <h2>Các Loại Sản Phẩm</h2>
            <div className="search-bar">
              <form>
                <input
                  type="text"
                  name="query"
                  placeholder="Search products..."
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <div className="product-grid">
              {/* Display filtered and paginated products */}
              {currentProducts.map((product: ProductType) => (
                <div key={product.id} className="product">
                  <Link to={`/product-detail/${product.id}`}>
                    <img src={product.imageProduct[0]} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.price} USD</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Pagination section */}
          <div className="w-full p-3 flex justify-end items-center gap-2">
            <div>
              {/* Dropdown for products per page */}
              <select
                className="border border-gray-800"
                name="productsPerPage"
                id="productsPerPage"
                value={productsPerPage}
                onChange={handlePerPageChange}
              >
                <option value="5">5 items per page</option>
                <option value="10">10 items per page</option>
                <option value="15">15 items per page</option>
                <option value="20">20 items per page</option>
              </select>
            </div>
            <div className="flex gap-2">
              {/* Pagination buttons */}
              {Array.from(Array(pageNumbers).keys()).map((number) => (
                <button
                  key={number}
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
        </section>
      </main>
      <FooterUser />
    </>
  );
}
