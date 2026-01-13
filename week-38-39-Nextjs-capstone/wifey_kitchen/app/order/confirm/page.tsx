//app/order/confirm/page.tsx

import PageTransition from "@/app/_components/ui/PageTransition";

export default function ConfirmPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-800 text-green-500 space-y-2">
        <div className="flex flex-col items-center gap-2">
          <h2 className="mt-2 font-semibold mb-4 text-3xl">
            Order Confirmed 🎉
          </h2>
          <p className="p-2 w-fit mx-auto my-4 text-2xl">
            Your order has been sent. You'll receive an e-receipt on your phone
            soon.
          </p>
          <a
            href="/"
            className="w-fit rounded bg-blue-800 text-gray-200 py-1 px-3"
          >
            Close
          </a>
        </div>
      </div>
    </PageTransition>
  );
}
