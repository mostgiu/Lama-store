import ProductList from "@/components/productList";
import Filter from "@/components/Filter";
import { products } from "@/data/products";
import TranslatedText from "@/components/TranslatedText";

type ProductsPageProps = {
    searchParams: Promise<{ sort?: string }>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
    const { sort } = await searchParams;
    const sortedProducts = [...products].sort((firstProduct, secondProduct) => {
        switch (sort) {
            case "price_asc":
                return firstProduct.price - secondProduct.price;
            case "price_desc":
                return secondProduct.price - firstProduct.price;
            case "name_asc":
                return firstProduct.name.localeCompare(secondProduct.name);
            case "name_desc":
                return secondProduct.name.localeCompare(firstProduct.name);
            default:
                return 0;
        }
    });

    return (
        <main className="pb-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500"><TranslatedText translationKey="collection" /></p>
                <h1 className="text-3xl font-bold text-gray-900"><TranslatedText translationKey="allProducts" /></h1>
                </div>
                <Filter />
            </div>

            <ProductList products={sortedProducts} />
        </main>
    );
};

export default ProductsPage;