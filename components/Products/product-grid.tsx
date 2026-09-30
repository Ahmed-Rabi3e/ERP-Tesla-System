import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../lib/product-data";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="hover:shadow-lg transition-shadow duration-200 flex flex-col"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.subcategory}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
            <CardTitle className="line-clamp-2">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {product.sku}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl font-bold text-foreground">
                  ${product.price}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Stock</p>
                <div className="flex items-center gap-2">
                  <div className="flex-grow bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{
                        width: `${Math.min((product.stock / 100) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {product.stock}
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full gap-2" disabled={product.stock === 0}>
              <ShoppingCart className="h-4 w-4" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
