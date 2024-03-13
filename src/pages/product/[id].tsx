import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContatiner,
  ProductContatiner,
  ProducutDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defautPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  function handleBuyProduct() {
    console.log(product.defautPriceId);
  }

  return (
    <ProductContatiner>
      <ImageContatiner>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContatiner>
      <ProducutDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProducutDetails>
    </ProductContatiner>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_PYXQVH2vErzcb9" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // i hour
  };
};
