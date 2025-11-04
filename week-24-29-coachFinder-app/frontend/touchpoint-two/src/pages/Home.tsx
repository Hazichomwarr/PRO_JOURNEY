import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Get help from someone who's been there.
          </h1>
          <p className="text-gray-600 mb-6">
            Find a buddy for your next challenge — quick, friendly, human.
          </p>
          <div className="flex gap-3">
            <Link
              to="/find"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Find a Buddy
            </Link>
            <Link to="/register" className="bg-white border px-4 py-2 rounded">
              Become a Buddy
            </Link>
          </div>
        </div>
        <div>
          <img src="/homeImage.png" alt="connect" className="rounded shadow" />
        </div>
      </section>
    </main>
  );
}
