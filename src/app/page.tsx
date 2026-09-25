import { products } from "@/data/products";
import HomeContent from "@/components/HomeContent";

const Homepage = () => {
  return <HomeContent products={products} />;
};

export default Homepage;