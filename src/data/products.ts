import type { productType } from "@/types";

export const products: productType[] = [
  {
    id: 1,
    name: "Essential T-Shirt",
    price: 89,
    shortDescription: "A comfortable and stylish knit set for everyday wear.",
    sizes: ["S", "M", "L"],
    colors: ["Gray", "Olive", "Purple"],
    images: {
      Gray: "/products/1g.png",
      Olive: "/products/1gr.png",
      Purple: "/products/1p.png",
    },
  },
  {
    id: 2,
    name: "Plaid Pullover Hoodie",
    price: 120,
    shortDescription: "A lightweight hoodie for casual wear.",
    sizes: ["S", "M", "L"],
    colors: ["Gray", "Green"],
    images: {
      Gray: "/products/2g.png",
      Green: "/products/2gr.png",
    },
  },
  {
    id: 3,
    name: "Colorblock Pullover Hoodie",
    price: 135,
    shortDescription: "A stylish overshirt for urban fashion.",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Black", "Green"],
    images: {
      Blue: "/products/3b.png",
      Black: "/products/3bl.png",
      Green: "/products/3gr.png",
    },
  },
  {
    id: 4,
    name: "Relaxed T-Shirt",
    price: 42,
    shortDescription: "A comfortable everyday t-shirt.",
    sizes: ["S", "M", "L"],
    colors: ["Coral", "Cream"],
    images: {
      Coral: "/products/4p.png",
      Cream: "/products/4w.png",
    },
  },
  {
    id: 5,
    name: "Classic Pullover Hoodie",
    price: 96,
    shortDescription: "A classic leather bag for everyday use.",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Orange", "Red"],
    images: {
      Black: "/products/5bl.png",
      Orange: "/products/5o.png",
      Red: "/products/5r.png",
    },
  },
  {
    id: 6,
    name: "Denim Overshirt",
    price: 158,
    shortDescription: "A versatile jacket for weekend outings.",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Teal"],
    images: {
      Blue: "/products/6g.png",
      Teal: "/products/6w.png",
    },
  },
  {
    id: 7,
    name: "Mesh Running Sneaker",
    price: 110,
    shortDescription: "A lightweight mesh sneaker with a cushioned sole.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Gray", "Pink"],
    images: {
      Gray: "/products/7g.png",
      Pink: "/products/7p.png",
    },
  },
  {
    id: 8,
    name: "Classic Runner Sneaker",
    price: 125,
    shortDescription: "A clean runner silhouette for daily movement.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Blue", "Green"],
    images: {
      Blue: "/products/8b.png",
      Green: "/products/8gr.png",
    },
  },
];