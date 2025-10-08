// pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between mx-auto my-12 w-[85%]">
        <header className="flex flex-col gap-4 items-start text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-snug">
            Find help. <br /> Offer help. <br /> Build connections.
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            TouchPoint connects people who need guidance with coaches ready to
            empower them — anytime, anywhere.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to={"/coaches"}
              className="bg-blue-600 font-medium px-3 py-2 rounded transition-colors duration-300 text-white hover:bg-blue-700"
            >
              Find a Coach
            </Link>
            <Link
              to={"/coaches/new"}
              className="bg-orange-600 font-medium px-3 py-2 rounded transition-colors duration-300 text-white hover:bg-orange-700"
            >
              Become a Coach
            </Link>
          </div>
        </header>

        <img
          src="/homeImage.png"
          alt="Coaching illustration"
          className="w-[400px] md:w-[500px] rounded-2xl shadow-lg"
        />
      </section>
      <section className="mt-16 grid md:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: "🧭",
            title: "Personalized Matchmaking",
            desc: "Find the coach that fits your goals and style.",
          },
          {
            icon: "💬",
            title: "1:1 Sessions & Reviews",
            desc: "Learn, grow, and track your progress through feedback.",
          },
          {
            icon: "🚀",
            title: "Grow & Mentor Others",
            desc: "Share your expertise and inspire change.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
}
