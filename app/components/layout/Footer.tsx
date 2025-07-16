import Image from "next/image";
import Link from "next/link";

const footerData = [
  {
    title: "APPLICATIONS",
    items: ["Apparel", "Automotive", "Filtration", "Customised Solutions"],
  },
  {
    title: "COMPANY",
    items: ["Innovation", "Global Competency", "About Us", "Contact Us"],
  },
  {
    title: "MORE",
    items: ["Careers", "Privacy Policy", "Terms and Conditions"],
  },
  { title: "FOLLOW US", items: ["Twitter", "LinkedIn", "Instagram", "Medium"] },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-white to-[#f5f7fb] py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:gap-16">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Supreme Group Logo"
            width={226}
            height={64}
            priority
          />
        </Link>
        <div className="flex flex-wrap gap-12">
          {footerData.map((col, idx) => {
            const isLast = idx === footerData.length - 1;
            return (
              <ul
                key={col.title}
                className={
                  isLast
                    ? "flex-none w-40" // narrower fixed width
                    : "flex-1 min-w-[150px]" // wide, grows with space
                }
              >
                <li className="mb-4 font-semibold text-black">{col.title}</li>
                {col.items.map((item) => (
                  <li key={item} className="mb-3">
                    <Link
                      href="#"
                      className="text-[14px] text-[#000000B2] transition-colors hover:text-[#0067B1]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 text-sm md:flex-row md:justify-between text-[#000000B2]">
          <span>©2024. All Rights Reserved.</span>
          <address className="not-italic">
            Supreme House: 110, 16th Road, Chembur, Mumbai - 400071.
          </address>
        </div>
      </div>
    </footer>
  );
}
