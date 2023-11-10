import { CheckIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import getStripe from "../../lib/getStripe";

export default function SubscribeContainer({
  children,
  tier,
  price,
  priceId,
  description,
}) {
  const router = useRouter();

  async function subscribe() {
    const user = localStorage.getItem("user");
    if (user) {
      const stripe = await getStripe();
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(priceId),
      });
      if (response.statusCode === 500) return;
      const data = await response.json();

      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      router.push("/login-register");
    }
  }

  return (
    <div className="h-auto bg-[#f5f4ef] flex flex-wrap gap-y-5 hover:shadow-xl sm:w-2/3 md:w-3/5 lg:w-96">
      <div className="m-4 flex font-bold">
        <span className="text-3xl p-4">{tier}</span>
        <span className="text-lg p-4 mt-1">{price}</span>
      </div>

      <div className="p-8 -mt-12 text-[#1F1F1F]">
        <p className="pb-8">{description}</p>
        <CheckIcon className="h-6 w-6 ml-5 inline" />
        <h3 className="pl-4 inline">Curated Pet Feed</h3>
        {children}
        <button
          onClick={subscribe}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center mx-auto mt-12 w-full"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
