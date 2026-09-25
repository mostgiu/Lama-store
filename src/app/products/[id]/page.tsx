import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "@/components/ProductDetails";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ProductPageProps): Promise<Metadata> => {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: `${product.shortDescription} Shop ${product.name} at Trend Lama. Available in ${product.colors.join(", ")} with sizes ${product.sizes.join(", ")}.`,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      type: "website",
      title: `${product.name} | Trend Lama`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[product.colors[0]],
          alt: product.name,
        },
      ],
    },
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);

  if (!product) notFound();

  return <ProductDetails product={product} />;
};

export default ProductPage;
