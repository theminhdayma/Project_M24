import HeaderUser from "../../components/User/HeaderUser";
import FooterUser from "../../components/User/FooterUser";

import { useDispatch, useSelector } from "react-redux";
import { Category, ProductType } from "../../interface";
import { useEffect, useState } from "react";
import { getAllCategory, getProducts } from "../../service/product.service";
import CategorySelect from "../../components/product/CategorySelect";
import ProductCard from "../../components/product/ProductCard";

export default function Product() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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

  // Filtered products based on selected category, brand, price range, and search keyword
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

    const filterBySearchKeyword =
      searchKeyword === "" ||
      product.name.toLowerCase().includes(searchKeyword.toLowerCase());

    return (
      filterByCategory &&
      filterByBrand &&
      filterByPrice &&
      filterBySearchKeyword
    );
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
    setCurrentPage(1);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen">
      <HeaderUser />
      <main>
        <div className="border-b border-ink-100">
          <div className="container py-6 flex flex-col gap-4">
            <h1 className="text-2xl font-display">Cửa hàng</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <CategorySelect
                  categories={listCategory}
                  onChange={(v) => setSelectedCategory(v)}
                  value={selectedCategory}
                />
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-ink-700">Hãng</span>
                  <select
                    className="rounded-md border border-ink-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                  >
                    <option value="">Tất cả các hãng</option>
                    {listProduct &&
                      listProduct
                        .map((product) => product.brand)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .map((brand, index) => (
                          <option key={index} value={brand}>
                            {brand}
                          </option>
                        ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-ink-700">Khoảng giá</span>
                  <select
                    className="rounded-md border border-ink-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
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
                </label>
              </div>
              <form onSubmit={handleSearchSubmit} className="flex items-end gap-2">
                <label className="flex flex-col gap-2 w-full">
                  <span className="text-sm text-ink-700">Tìm kiếm</span>
                  <input
                    type="text"
                    name="query"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="rounded-md border border-ink-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </label>
                <button type="submit" className="btn-primary px-4 py-2">Search</button>
              </form>
            </div>
          </div>
        </div>

        <section className="py-8">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentProducts.map((product: ProductType) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.imageProduct[0]}
                  badge={product.purchaseCount > 50 ? "Hot" : undefined}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-sm text-ink-700 flex items-center gap-2">
                Hiển thị
                <select
                  className="rounded-md border border-ink-300 px-2 py-1 outline-none focus:ring-2 focus:ring-brand-400"
                  name="productsPerPage"
                  id="productsPerPage"
                  value={productsPerPage}
                  onChange={handlePerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                sản phẩm/trang
              </label>
              <div className="flex gap-2">
                {Array.from(Array(pageNumbers).keys()).map((number) => (
                  <button
                    key={number}
                    className={`px-3 py-1.5 rounded-md border ${
                      currentPage === number + 1
                        ? "bg-brand-600 text-white border-brand-600"
                        : "border-ink-200 text-ink-700 hover:bg-ink-100"
                    }`}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterUser />
    </div>
  );
}
