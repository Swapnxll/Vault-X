import React, { useState } from "react";
import axios from "axios";
import identity from "../assets/identity.jpg";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Breach = ({ user }) => {
  const [email, setEmail] = useState("");
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckBreach = async () => {
    if (!email.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Adjust key if different
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/auth/public/expose/check`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Success");
      setBreaches(data.data || []);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setBreaches([]);
    }
    setLoading(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="font-vault bg-black text-[#cdc6be] w-full text-center overflow-hidden px-[5px] my-5">
        <div className="text-[14vw] leading-none">1.THE BREACH</div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mx-4 lg:mx-8">
        {/* Left section */}
        <div className="w-full lg:w-2/3 p-4 lg:p-6 rounded-lg border bg-[#3d3d3d] border-black flex flex-col">
          <div className="p-4 rounded-lg border-2 border-dashed border-white flex-1">
            {/* Check Email Breach */}
            <div className="mb-6">
              <h5 className="text-white text-2xl lg:text-3xl font-article mb-2">
                Is your email breached? Check here right now:
              </h5>
              <div className="flex flex-col sm:flex-row mb-4 gap-2 sm:gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 border rounded-lg sm:rounded-l-lg sm:rounded-r-none px-4 py-2 focus:outline-none bg-[#fff] focus:ring-2 focus:ring-[#764b3a] font-article"
                />
                <button
                  onClick={handleCheckBreach}
                  className="bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors font-pixel"
                >
                  {loading ? "Checking..." : "Check"}
                </button>
              </div>
            </div>

            {/* Breaches Display */}
            <div>
              <h5 className="text-white text-2xl lg:text-3xl font-vault mb-2">
                Breaches:
              </h5>
              {breaches.length === 0 ? (
                <p className="text-gray-300 font-vault">No breaches found.</p>
              ) : (
                <ul className="space-y-4">
                  {breaches.map((breach, index) => (
                    <li
                      key={index}
                      className="p-4 rounded border border-gray-400 bg-[#252525] flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium font-article text-lg sm:text-xl break-words">
                          {breach.breach || breach.site}
                        </p>
                        <p className="text-gray-400 text-sm break-words line-clamp-2">
                          {breach.description}
                        </p>
                        <p className="text-gray-400 text-xs break-words mt-1">
                          Domain: {breach.domain} | Industry: {breach.industry}
                        </p>
                        <p className="text-gray-300 text-xs break-words mt-1">
                          Exposed Year:{" "}
                          {breach.xposed_date || breach.xposedDate}
                        </p>
                      </div>
                      <div className="hidden sm:block w-20 h-20 rounded-full overflow-hidden border border-gray-400 flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={breach.logo}
                          alt={breach.breach}
                          className="w-full h-full object-contain bg-white p-2"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Right section (Article) */}
        <div className="w-full lg:w-1/3 flex flex-col ">
          <div className="p-6 rounded-2xl border border-black shadow-lg flex flex-col h-full bg-[#cdc6be]">
            <h2 className="text-2xl lg:text-3xl font-bold font-article text-[#764b3a] mb-4 text-left">
              What to do if your email has been breached?
            </h2>

            {/* Identity Image */}
            <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
              <img
                src={identity}
                alt="Identity Protection"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-black font-article space-y-4 flex-1 text-base lg:text-lg">
              <p className="text-left font-article">
                If your email is breached, immediately change all related
                passwords and enable two-factor authentication. Monitor your
                email and financial accounts daily for unusual activity. Use
                offered identity protection services to safeguard against
                further risks.
              </p>
            </div>
            <a
              href="https://www.forbes.com/sites/quora/2022/03/10/what-to-do-if-your-email-is-in-a-data-breach/"
              className="mt-6 text-[#764b3a] hover:underline font-article text-left"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Breach;
