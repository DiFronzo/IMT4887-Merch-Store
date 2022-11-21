/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { aspectRatio } from "@twind/aspect-ratio";
import { formatCurrency } from "@/utils/data.ts";
import { graphql } from "@/utils/shopify.ts";
import { Footer } from "@/components/Footer.tsx";
import { HeadElement } from "@/components/HeadElement.tsx";
import { Header } from "@/components/Header.tsx";
import IconCart from "@/components/IconCart.tsx";
import { List, Product } from "../utils/types.ts";
import ShowItem from "@/islands/ShowItem.tsx";


const q = `{
  products(first: 10) {
    nodes {
      id
      handle
      title
      tags
      featuredImage {
        url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}`;

interface Data {
  products: List<Product>;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const data = await graphql<Data>(q);
    return ctx.render(data);
  },
};

export default function Home(ctx: PageProps<Data>) {
  const { data, url } = ctx;
  const products = data.products.nodes;
  return (
    <div>
      <HeadElement
        description="Shop for Merch"
        image={url.href + "og-image.png"}
        title="Merch"
        url={url}
      />
      <Header />
      <div
        class={tw`w-11/12 max-w-5xl mx-auto mt-28`}
        aria-labelledby="information-heading"
      >
        <h2 id="information-heading" class={tw`sr-only`}>
          Product List
        </h2>
        <div
          class={tw`grid grid-cols-1 gap-8 sm:!gap-x-10 sm:!grid-cols-2 lg:!grid-cols-3 lg:!gap-x-12 lg:!gap-y-10`}
        >
          {products.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductCard(props: { product: Product }) {
  const { product } = props;
  return (
    <a key={product.id} href={`/products/${product.handle}`} class={tw`group w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative`}>
    <div
      class={tw`${
        aspectRatio(1, 1)
      } `}
    >
      {product.featuredImage && (
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || "ok"}
          class={tw`w-full h-full object-center object-contain p-8 absolute block`}
        />
      )}
      <div
        class={tw`w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-500`}
      >
        <IconCart size={30} />
      </div>
    </div>
    <div class={tw`px-5 pb-5`}>
      <h3 class={tw`text-xl font-semibold tracking-tight text-gray-900 dark:text-white relative`}>
        {product.title}
      </h3>
      <div class="flex justify-between items-center">
        <strong class={tw`text-3xl font-bold text-gray-900 dark:text-white`}>
          {formatCurrency(product.priceRange.minVariantPrice)}
          </strong>
          <div>
              <ShowItem />
          </div>
      </div>



    </div>
    </a>
  );
}
