"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Category } from "@/lib/product-data";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  availableSubcategories: string[];
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  selectedSubcategory,
  availableSubcategories,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="space-y-6">
      {/* Category Buttons */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground block">
          Categories
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                if (selectedCategory === category.id) {
                  onCategoryChange(null);
                } else {
                  onCategoryChange(category.id);
                }
              }}
            >
              {category.name}
              {selectedCategory === category.id && (
                <X className="h-4 w-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Subcategory Buttons */}
      {selectedCategory && availableSubcategories.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground block">
            Subcategories
          </label>
          <div className="space-y-2">
            {availableSubcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={
                  selectedSubcategory === subcategory ? "default" : "outline"
                }
                className="w-full justify-start text-sm"
                onClick={() => {
                  if (selectedSubcategory === subcategory) {
                    onSubcategoryChange(null);
                  } else {
                    onSubcategoryChange(subcategory);
                  }
                }}
              >
                {subcategory}
                {selectedSubcategory === subcategory && (
                  <X className="h-4 w-4 ml-auto" />
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
