import AppCard from "@/components/ui/AppCard";
import { THeroCoverProps } from "./Hero";
import assets from "@/assets";

const FoodCupBoardProductsSidebar = () => {
  const cover: THeroCoverProps = {
    topHeader: "Seafood",
    description: "every hour",
    heading: "PRODUCTS",
    id: 1,
    offerAmount: null,
    photo: assets.images.banners.seafood,
    path: "",
    subHeading: "FRESHES",
  };
  return <AppCard cover={cover} variant="primary" className="" size="lg" />;
};

export default FoodCupBoardProductsSidebar;
