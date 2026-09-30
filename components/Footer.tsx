import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const LABELS = {
  quickLinks: { home: "Home", about: "About", PRODUCTS: "Products" },
  contactTitle: "Contact",
  contact: { email: "Email", phone: "Phone", address: "Address" },
  followUs: "Follow us",
  rights: "All rights reserved.",
};

const quickLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "PRODUCTS", path: "/products" },
];

const contactInfo = [
  { key: "email", value: "info@teslamedical.com" },
  { key: "phone", value: "+1 (555) 123-4567" },
  { key: "address", value: "Dalha Agriculture school, Fayoum - Egypt" },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaTwitter />, href: "https://twitter.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
];

const qr_code = "/assets/qr.webp";

const Footer = () => {
  return (
    <footer className="text-white py-10 px-6 bg-gradient-to-tl from-rose-400 via-red-400 to-rose-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Link href="/" className="flex items-center -mt-9">
            <Image
              src="/assets/tesla.png"
              alt="logo"
              loading="lazy"
              width={128}
              height={128}
              className="h-32 w-32 object-contain"
            />
          </Link>
          <p className="text-sm text-gray-200 max-w-xs">
            Tesla Medical Company provides trusted biomedical equipment and
            professional service to hospitals and clinics worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            {quickLinks.map(({ key, path }) => (
              <li key={key}>
                <Link href={path} className="hover:underline transition">
                  {LABELS.quickLinks[key as keyof typeof LABELS.quickLinks]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{LABELS.contactTitle}</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            {contactInfo.map(({ key, value }) => (
              <li key={key}>
                <span className="font-medium">
                  {LABELS.contact[key as keyof typeof LABELS.contact]}:{" "}
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{LABELS.followUs}</h3>
          <div className="flex space-x-4 mt-2 text-white/90">
            {socialLinks.map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-md hover:bg-white/10"
              >
                {icon}
              </a>
            ))}
          </div>
          <div>
            <Image
              src={qr_code}
              alt="qrcode"
              width={96}
              height={96}
              className="mt-4"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Tesla Medical Company. {LABELS.rights}
      </div>
    </footer>
  );
};

export default Footer;
