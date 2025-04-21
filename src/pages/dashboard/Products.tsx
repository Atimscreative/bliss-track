import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { Plus, Search, Pen, Trash, Check, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/services/mockData";
import ProductDialog from "@/components/widgets/Dialogs/ProductDialog";
import DeleteProductDialog from "@/components/widgets/Dialogs/DeleteDialog";

// Mock data - in a real app this would come from your backend
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Cotton Bedsheet",
    description: "High quality cotton bedsheet",
    price: 15000,
    size: "4.5",
    quantity: 50,
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock products as needed
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const { toast } = useToast();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (productId: string) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "draft" ? "published" : "draft",
              updatedAt: new Date().toISOString(),
            }
          : product
      )
    );
    // toast({
    //   title: "Status updated",
    //   description: "Product status has been updated successfully.",
    // });
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      // toast({
      //   title: "Product deleted",
      //   description: "Product has been deleted successfully.",
      // });
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const onProductSave = (product: Product) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === product.id
            ? { ...product, updatedAt: new Date().toISOString() }
            : p
        )
      );
    } else {
      // Add new product
      setProducts([
        ...products,
        {
          ...product,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
    setIsDialogOpen(false);
    setSelectedProduct(null);
    // toast({
    //   title: selectedProduct ? "Product updated" : "Product created",
    //   description: `Product has been ${
    //     selectedProduct ? "updated" : "created"
    //   } successfully.`,
    // });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{formatNaira(product.price)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "published" ? "default" : "secondary"
                    }
                    className="cursor-pointer"
                    onClick={() => handleStatusToggle(product.id)}
                  >
                    {product.status === "published" ? (
                      <Check className="mr-1 h-3 w-3" />
                    ) : (
                      <FileText className="mr-1 h-3 w-3" />
                    )}
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pen className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={selectedProduct}
        onSave={onProductSave}
      />

      <DeleteProductDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={confirmDelete}
        productName={selectedProduct?.name || ""}
      />
    </div>
  );
};

export default Products;
