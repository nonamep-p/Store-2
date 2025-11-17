'use client';
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { categories as allCategories, tags as allTags } from "@/lib/data";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    priceRange: [number, number];
    categories: string[];
    sizes: string[];
    colors: string[];
    tags: string[];
  };
  onFilterChange: (filters: any) => void;
}

export function FilterSidebar({ isOpen, onClose, filters, onFilterChange }: FilterSidebarProps) {
  const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#EF4444" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#A855F7" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed lg:sticky top-0 left-0 h-screen lg:h-auto lg:top-20 w-80 bg-card border-r border-border overflow-y-auto z-50 lg:z-10 p-6 rounded-lg shadow-xl lg:shadow-none lg:bg-transparent lg:border-none lg:p-0 lg:w-64"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Filters</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <Label className="mb-4 block font-semibold">Price Range</Label>
          <Slider
            defaultValue={filters.priceRange}
            value={filters.priceRange}
            max={500}
            step={10}
            className="mb-3"
            onValueChange={(value) =>
              onFilterChange({ ...filters, priceRange: value as [number, number] })
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <Label className="mb-4 block font-semibold">Category</Label>
          <div className="space-y-3">
            {allCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => {
                    const newCategories = checked
                      ? [...filters.categories, category]
                      : filters.categories.filter((c) => c !== category);
                    onFilterChange({ ...filters, categories: newCategories });
                  }}
                />
                <label
                  htmlFor={category}
                  className="text-sm cursor-pointer hover:text-white transition-colors"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div className="mb-8">
          <Label className="mb-4 block font-semibold">Tags</Label>
          <div className="space-y-3">
            {allTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={filters.tags.includes(tag)}
                  onCheckedChange={(checked) => {
                    const newTags = checked
                      ? [...filters.tags, tag]
                      : filters.tags.filter((c) => c !== tag);
                    onFilterChange({ ...filters, tags: newTags });
                  }}
                />
                <label
                  htmlFor={tag}
                  className="text-sm cursor-pointer hover:text-white transition-colors capitalize"
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <Label className="mb-4 block font-semibold">Size</Label>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  const newSizes = filters.sizes.includes(size)
                    ? filters.sizes.filter((s) => s !== size)
                    : [...filters.sizes, size];
                  onFilterChange({ ...filters, sizes: newSizes });
                }}
                className={`py-2 text-sm border rounded-md transition-all ${
                  filters.sizes.includes(size)
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input hover:bg-accent"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-8">
          <Label className="mb-4 block font-semibold">Color</Label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  const newColors = filters.colors.includes(color.name)
                    ? filters.colors.filter((c) => c !== color.name)
                    : [...filters.colors, color.name];
                  onFilterChange({ ...filters, colors: newColors });
                }}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.name)
                    ? "border-primary scale-110"
                    : "border-transparent hover:border-border"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            onFilterChange({
              priceRange: [0, 500],
              categories: [],
              sizes: [],
              colors: [],
              tags: []
            })
          }
        >
          Clear All Filters
        </Button>
      </motion.div>
    </>
  );
}
