import React from "react";
import { useNavigate } from "react-router-dom";
import img4 from "../assets/image.jpg";
const Vaultcomponent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 m-5">
        {/* Password Vault Card (4 parts) */}
        <div className="flex-[3] bg-[#3d3d3d] p-6 text-white rounded-lg shadow-md">
          <div className="border border-dashed border-white p-6 rounded-md flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1">
              <p className="text-5xl text-[#cdc6be] font-bold font-heading mb-3">
                Need a vault to safely store your passwords???
              </p>
              <p className="text-sm font-article text-neutral-300 mb-5 max-w-xl">
                Remembering passwords can be a real fuss — and reusing them
                makes you vulnerable. Your credentials might already be part of
                massive leaks. Check if your password has been exposed and learn
                how to keep it safe, encrypted, and secured like it's in a
                digital vault.
              </p>
              <div
                onClick={() => navigate("/vault")}
                className="inline-block cursor-pointer bg-white text-neutral-900 hover:bg-neutral-200 px-6 py-2 rounded-md transition duration-300 text-sm font-semibold shadow-sm hover:shadow-md ring-1 ring-white/10 hover:ring-white/30"
              >
                Vault
              </div>
            </div>
          </div>
        </div>

        {/* Side Article (1 part) - hidden on small screens */}
        <div className=" flex-[1] p-4 rounded-lg shadow-inner text-black font-article text-sm leading-relaxed">
          <p className="font-semibold text-black font-heading text-xl mb-2">
            Why Passwords Are Easily Breachable?!!
          </p>

          <img
            src={img4}
            alt="Security Concept"
            className="w-full h-24 object-cover mb-2 px-4 "
          />

          <p className="text-xs px-4">
            Passwords are often weak, reused, or stored insecurely — making them
            vulnerable to brute-force attacks, credential stuffing, and database
            leaks. Without hashing, salting, or two-factor authentication, even
            basic exploits can grant full access. A secure password vault with
            encryption is essential to minimize your attack surface.
            <br />
            <a
              href="https://owasp.org/www-community/passwords"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-400"
            >
              Read more
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vaultcomponent;
