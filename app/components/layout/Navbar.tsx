"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import LinkedInIcon from "../../assets/icons/bxl-linkedin.svg";
import TranslateIcon from "../../assets/icons/translate 1.svg";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Navbar = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useTranslations();


  // Close menu when screen size changes (e.g., from mobile to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/Supreme_logos (3).svg"
            alt="Supreme Group Logo"
            width={148}
            height={44}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/contact" isButton>
            {t("Contact Us")}
          </NavLink>
          <SocialLink
            href="https://linkedin.com"
            icon={LinkedInIcon}
            alt="LinkedIn"
          />
          <LanguageSelector  locale={locale}/>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl text-black">&#9776;</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav  className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md py-6 px-4 flex flex-col gap-4">
          <NavLink href="/contact" isButton onClick={closeMenu}>
            {t("Contact Us")}
          </NavLink>
          <SocialLink
            href="https://linkedin.com"
            icon={LinkedInIcon}
            alt="LinkedIn"
            text="LinkedIn"
            onClick={closeMenu}
          />
          <LanguageSelector locale={locale} />
        </nav>
      )}
    </header>
  );
};

// --- Helper Components for Reusability ---

const NavLink = ({
  href,
  children,
  isButton = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isButton?: boolean;
  onClick?: () => void;
}) => (
  <Link href={href} onClick={onClick}>
    {isButton ? (
      <button className="w-full rounded-full bg-cyan-500 px-5 py-2 text-white transition hover:bg-cyan-600 cursor-pointer">
        {children}
      </button>
    ) : (
      children
    )}
  </Link>
);

const SocialLink = ({
  href,
  icon,
  alt,
  text,
  onClick,
}: {
  href: string;
  icon: string;
  alt: string;
  text?: string;
  onClick?: () => void;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2"
    onClick={onClick}
  >
    <Image
      src={icon}
      alt={alt}
      width={text ? 24 : 16}
      height={text ? 24 : 16}
    />
    {text && <span>{text}</span>}
  </a>
);

const LanguageSelector = ({locale}: {locale: string}) => {
  // When the user is on `/en`, this will be `/`
  const pathname = usePathname();
  const router = useRouter();
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    console.log({ pathname, selectedLanguage });
    router.replace("/", { locale: selectedLanguage });
  };

  return (
    <div className="flex items-center gap-3">
      <Image src={TranslateIcon} alt="Language" width={25} height={25} />
      <select value={locale} className="text-black" onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default Navbar;
