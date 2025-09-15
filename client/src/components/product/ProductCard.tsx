import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
};

export default function ProductCard({ id, name, price, image, badge }: Props) {
  return (
    <Card className="overflow-hidden group">
      <Link to={`/product-detail/${id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          {badge && <div className="absolute left-2 top-2"><Badge className="bg-brand-600 text-white">{badge}</Badge></div>}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-1">{name}</h3>
          <p className="mt-1 text-brand-700 font-semibold">${price}</p>
        </div>
      </Link>
    </Card>
  );
}


