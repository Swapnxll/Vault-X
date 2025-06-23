import React from "react";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img4.jpeg";
import img3 from "../assets/img2.jpeg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="font-vault bg-black text-[#cdc6be] w-full text-center overflow-hidden px-[5px] my-5">
        <div className="text-[25vw] leading-none">VAULT-X</div>
      </div>

      {/* Main Content - Fixed */}
      <div className="flex flex-col md:flex-row min-h-screen text-black w-full my-10 px-4">
        {/* Left - Article Section */}
        <div className="w-full md:w-[30%] p-3 box-border overflow-hidden">
          <h2 className="text-6xl font-bold mt-2 font-heading">
            The Hacker Who Shook Nations...
          </h2>
          <img
            src={img1}
            alt="Hacker Shadow"
            className="w-full max-w-sm md:max-w-full h-auto rounded-lg mx-auto"
          />

          <p className="font-article text-sm font-bold leading-relaxed text-black mt-2">
            In 2022, a hacker known as "P4x" infiltrated North Korean servers in
            retaliation for previous cyberattacks. Operating solo, he disrupted
            numerous government systems using remote access exploits. His
            actions exposed vulnerabilities even in the world's most secretive
            regimes.
          </p>
          <a
            href="https://www.wired.com/story/p4x-north-korea-internet-hacker-identity-reveal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-black hover:underline text-sm mt-4"
          >
            Read full article →
          </a>
        </div>

        {/* Vertical Dashed Divider */}
        <div className="hidden md:block mx-2 w-px bg-transparent border-l border-dashed border-neutral-600 my-4"></div>

        {/* Right - Content Section */}
        <div className="w-full md:w-[70%] flex flex-col gap-6 box-border">
          {/* Article Section (hidden on small screens) */}
          <div className="hidden md:flex bg-[#7A6152] p-6 text-white rounded-lg shadow-md flex-col gap-6">
            <h2 className="text-4xl font-heading text-black font-bold">
              Why You Should Be Concerned!!!
            </h2>

            <img
              src={img2}
              alt="Data Breach Concern"
              className="w-full h-auto rounded-lg object-cover"
            />

            <p className="text-sm font-article font-medium text-black leading-relaxed">
              Data breaches aren't just corporate issues — they affect real
              people. When your personal information like email addresses,
              passwords, or banking details is exposed, it can lead to identity
              theft, financial loss, or even blackmail. Hackers often sell
              stolen data on the dark web, putting your digital life at risk
              without you even knowing. Beyond financial harm, breaches can also
              result in emotional and reputational damage. Leaked medical
              records, private conversations, or sensitive photos can be used to
              shame or manipulate victims. For businesses, the cost of recovery
              includes legal fees, loss of consumer trust, and irreversible
              damage to their brand.
            </p>

            <a
              href="https://www.csoonline.com/article/2120077/what-is-a-data-breach-how-they-happen-and-what-to-do-about-it.html"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start mt-2 underline text-sm text-black hover:text-white transition-colors duration-200"
            >
              Read full article →
            </a>
          </div>

          {/* Call-to-action Box */}
          <div className="bg-[#3d3d3d] p-6 text-white rounded-lg shadow-md">
            <div className="border border-dashed border-white p-6 rounded-md flex flex-col md:flex-row gap-6 w-full">
              {/* Text and CTA section - takes available space */}
              <div className="flex-1">
                <p className="text-4xl font-bold text-[#cdc6be] font-heading mb-3">
                  Wanna know if you've been breached?
                </p>
                <p className="text-sm font-article text-neutral-300 mb-5 max-w-xl">
                  <p className="text-sm font-article text-neutral-300 mb-5 max-w-xl">
                    Your email might be floating around the dark web without you
                    even realizing it. Wanna know which websites may have leaked
                    your data? Find out if your credentials have been
                    compromised in recent breaches and take control of your
                    digital safety before it’s too late.
                  </p>
                </p>
                <div
                  onClick={() => navigate("/breach")}
                  className="inline-block  bg-white text-neutral-900 hover:bg-neutral-200 px-6 py-2 rounded-md transition duration-300 text-sm font-semibold shadow-sm hover:shadow-md ring-1 ring-white/10 hover:ring-white/30"
                >
                  Check My Email →
                </div>
              </div>

              {/* Image section - fixed size right-aligned */}
              <div className="hidden md:block w-[200px] h-[200px] overflow-hidden rounded-2xl flex-shrink-0">
                <img
                  src={img3}
                  alt="Data Breach Concern"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
