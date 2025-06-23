import React from "react";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-700 text-black font-heading text-xl px-6 py-4 flex flex-row items-center justify-between">
      {/* Left: Brand */}
      <div className="font-semibold text-black font-heading text-lg">
        Vault-X
      </div>

      {/* Right: Contact Info */}
      <div className="flex gap-6 items-center">
        <a
          href="https://github.com/swapnxll"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition flex items-center gap-2"
        >
          <Github size={18} />
          GitHub
        </a>
        <a
          href="mailto:swapnilsinha1912@gmail.com"
          className="hover:text-black transition flex items-center gap-2"
        >
          <Mail size={18} />
          Email
        </a>
      </div>
    </footer>
  );
};

export default Footer;
