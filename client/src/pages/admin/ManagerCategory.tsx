import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../interface";
import { useEffect, useState } from "react";
import { getAllCategory, deleteCategory } from "../../service/product.service";
import FormAddCategory from "../../components/From/FormAddCategory";
import FormUpdateCategory from "../../components/From/FormUpdateCategory";

export default function ManagerCategory() {
  const [showFormAddCategory, setShowFormAddCategory] =
    useState<boolean>(false);
  const [showFormUpdateCategory, setShowFormUpdateCategory] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const listCategory: Category[] = useSelector(
    (state: any) => state.product.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleShowAdd = () => {
    setShowFormAddCategory(true);
  };

  const closeFromAdd = () => {
    setShowFormAddCategory(false);
  };

  const handleUpdate = (category: Category) => {
    setSelectedCategory(category);
    setShowFormUpdateCategory(true);
  };

  const closeFromUpdate = () => {
    setShowFormUpdateCategory(false);
    setSelectedCategory(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };  

  return (
    <>
      <div className="order">
        <div className="head">
          <h3 className="cursor-pointer" onClick={handleShowAdd}>
            Thêm Danh mục
          </h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại sản phẩm</th>
              <th>Mô tả</th>
              <th>Ngày tạo</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listCategory.map((category: Category, index: number) => (
              <tr
                className="cursor-pointer"
                key={index}
              >
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.created_at}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(category)}
                    className="button update"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="button delete"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showFormAddCategory && <FormAddCategory closeFromAdd={closeFromAdd} />}
      {showFormUpdateCategory && selectedCategory && (
        <FormUpdateCategory
          closeFromUpdate={closeFromUpdate}
          category={selectedCategory}
        />
      )}
    </>
  );
}
