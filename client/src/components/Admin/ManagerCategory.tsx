import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../interface";
import { useEffect, useState } from "react";
import { getAllCategory, deleteCategory } from "../../service/product.service";
import FormAddCategory from "../From/FormAddCategory";
import FormUpdateCategory from "../From/FormUpdateCategory";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa danh mục này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
        Swal.fire("Deleted!", "Đã xóa danh mục", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Hủy xóa danh mục", "error");
      }
    });
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-ink-700">
            <i className="bx bx-search" />
            <i className="bx bx-filter" />
          </div>
          <button
            className="btn-primary px-4 py-2 flex items-center gap-2"
            onClick={handleShowAdd}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <span>Thêm Danh mục</span>
          </button>
        </div>
        <div className="overflow-auto rounded-lg border border-ink-100">
          <table className="w-full min-w-[700px]">
            <thead className="bg-ink-50 text-left text-sm text-ink-700">
              <tr>
                <th className="p-3">STT</th>
                <th className="p-3">Loại sản phẩm</th>
                <th className="p-3">Mô tả</th>
                <th className="p-3">Ngày tạo</th>
                <th className="p-3">Chức năng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {listCategory.map((category: Category, index: number) => (
                <tr key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{category.name}</td>
                  <td className="p-3">{category.description}</td>
                  <td className="p-3">{category.created_at}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(category)}
                        className="btn-ghost px-3 py-1.5"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="btn-primary px-3 py-1.5"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
