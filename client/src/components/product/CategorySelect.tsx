import React from "react";
import { Category } from "../../interface";

type Props = {
  categories: Category[];
  onChange: (id: string) => void;
  value?: string;
};

export default function CategorySelect({ categories, onChange, value }: Props) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-ink-700">Danh mục sản phẩm</span>
      <select
        className="rounded-md border border-ink-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value="">Chọn danh mục</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id.toString()}>{c.name}</option>
        ))}
      </select>
    </label>
  );
}


