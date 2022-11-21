/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function ShowItem() {

  return (
    <button
      class={tw`bg-blue-700 rounded-lg py-2.5 px-5 flex items-center justify-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`}
    >
      View
    </button>
  );
}
