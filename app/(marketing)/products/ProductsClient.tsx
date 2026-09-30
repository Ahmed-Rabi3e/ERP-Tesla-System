"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductGrid from "@/components/Products/product-grid";
import CategoryFilter from "@/components/Products/category-filter";
import { products, categories } from "@/lib/product-data";

export default function ProductsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesSubcategory =
        !selectedSubcategory || product.subcategory === selectedSubcategory;

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  const currentCategory = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;
  const availableSubcategories = currentCategory?.subcategories || [];

  return (
    <main className="min-h-screen bg-background my-16">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Medical Devices Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our comprehensive range of diagnostic devices and spare parts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                availableSubcategories={availableSubcategories}
                onCategoryChange={(cat) => {
                  setSelectedCategory(cat);
                  setSelectedSubcategory(null);
                }}
                onSubcategoryChange={setSelectedSubcategory}
              />

              {/* Clear Filters */}
              {(selectedCategory || selectedSubcategory || searchQuery) && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content - Products */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {filteredProducts.length} Product
                  {filteredProducts.length !== 1 ? "s" : ""} Found
                </h2>
                {(selectedCategory || searchQuery) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedCategory && `Category: ${currentCategory?.name}`}
                    {selectedSubcategory &&
                      `  Subcategory: ${selectedSubcategory}`}
                    {searchQuery && `  Search: "${searchQuery}"`}
                  </p>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Try adjusting your filters or search terms to find what
                    you&apos;re looking for.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
