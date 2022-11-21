/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Cart from "../islands/Cart.tsx";

export function Header() {
  return (
    <header
      class={tw`h-[110px] sm:!h-[144px] w-full bg-cover bg-no-repeat relative`}
      style={{
        backgroundImage: "url(/header_bg.svg)",
      }}
    >
      <div class={`rainfall ${tw`w-full h-full absolute`}`} />
      <nav
        class={tw`w-11/12 h-24 max-w-5xl mx-auto flex items-center justify-between relative`}
      >
        <a href="/">
          <img
            src="/shop.svg" /*logo coming soon*/
            alt="Logo"
            class={tw`h-14 w-14`}
          />
        </a>
        <h1>
          The Store
        </h1>
        <Cart />
      </nav>
    </header>
  );
}
