import AddProduct from "@/pages/AddProduct";
import HomePage from "@/pages/Home";
import OrderList from "@/pages/OrderList";
import ProductDetails from "@/pages/ProductDetails";
import ProductList from "@/pages/ProductList";
import UpdateProduct from "@/pages/UpdateProduct";
import { BarChart2, Home, Images, ShoppingBag, User } from "lucide-react";
import { IoMdPricetag } from "react-icons/io";
import AddOrderPage from "@/pages/AddOrderPage";
import { TPath } from "@/types";
import AnalyticsPage from "../pages/Analytics";
import AddCustomer from "@/pages/AddCustomer";
import CustomerListPage from "@/pages/CustomerList";
import AddImagePage from "@/pages/AddImage";
import ImageListPage from "@/pages/ImageList";
import AddCollectionPage from "@/pages/AddCollection";
import CollectionListPage from "@/pages/CollectionList";
import AddCategoryPage from "@/pages/AddCategory";
import CategoryListPage from "@/pages/CategoryList";
import BrandListPage from "@/pages/BrandList";
import AddBrandsPage from "@/pages/AddBrand";
import AddVariantPage from "@/pages/AddVariant";
import VariantListPage from "@/pages/VariantList";

const paths: TPath[] = [
  {
    icon: <Home />,
    index: true,
    element: <HomePage />,
    label: "Home",
  },
  {
    icon: <ShoppingBag />,
    label: "Orders",
    path: "orders",
    children: [
      {
        label: "Add",
        path: "new",
        element: <AddOrderPage />,
      },
      {
        label: "List",
        path: "list",
        element: <OrderList />,
      },
    ],
  },
  {
    icon: <IoMdPricetag />,
    label: "Product",
    path: "products",
    children: [
      {
        path: `new`,
        label: "Add",
        element: <AddProduct />,
      },
      {
        path: `list`,
        label: "List",
        element: <ProductList />,
      },
      {
        path: "update/:id",
        element: <UpdateProduct />,
      },
      {
        path: ":id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    icon: <User />,
    label: "Customers",
    path: "customers",
    children: [
      {
        path: "new",
        label: "Add",
        element: <AddCustomer />,
      },
      {
        path: "list",
        label: "List",
        element: <CustomerListPage />,
      },
    ],
  },
  {
    icon: <Images />,
    label: "Contents",
    path: "contents",
    children: [
      {
        index: true,
        element: <ImageListPage />,
      },
      {
        path: "add-image",
        element: <AddImagePage />,
      },
      {
        label: "Images",
        path: "images",
        element: <ImageListPage />,
      },
      {
        path: "add-collection",
        element: <AddCollectionPage />,
      },
      {
        label: "Collections",
        path: "collections",
        element: <CollectionListPage />,
      },
      {
        path: "add-category",
        element: <AddCategoryPage />,
      },
      {
        label: "Categories",
        path: "categories",
        element: <CategoryListPage />,
      },
      {
        path: "add-brand",
        element: <AddBrandsPage />,
      },
      {
        label: "Brands",
        path: "brands",
        element: <BrandListPage />,
      },
      {
        path: "add-variant",
        element: <AddVariantPage />,
      },
      {
        label: "Variants",
        path: "variants",
        element: <VariantListPage />,
      },
    ],
  },
  {
    icon: <BarChart2 />,
    label: "Analytics",
    path: "analytics",
    element: <AnalyticsPage />,
  },
];
export default paths;