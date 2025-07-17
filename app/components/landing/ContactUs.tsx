import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
    const t = await getTranslations()
    // @ts-nocheck
  const onSubmit = async (data: any) => {
    "use server";
    // TODO: save the data to the database
  };

  return (
    <section className="bg-[#0067B1]">
      <div className="text-white py-40 flex flex-col md:flex-row gap-16 mx-auto px-6 md:px-12 max-w-6xl">
        <div className="md:w-1/2">
          <h2 className="font-bold leading-none mb-6 text-[48px] md:text-[48px]">
            {t("Get in touch")}
          </h2>
          <div className="w-12 h-[3px] bg-white mb-8"></div>

          <p className="text-[1.25rem] mb-10 font-light">
            {t("For general enquiries")}
          </p>

          <ul className="space-y-8 text-[1.125rem] text-white/90">
            <li>
              <strong className="font-medium">{t("Address")} :</strong>
              <p>110, 16th Road, Chembur, Mumbai&nbsp;‑&nbsp;400071</p>
            </li>
            <li>
              <strong className="font-medium">{t("Phone")} :</strong>
              <p>+91&nbsp;22&nbsp;25208822</p>
            </li>
            <li>
              <strong className="font-medium">{t("Email")} :</strong>
              <p>info@supremegroup.co.in</p>
            </li>
          </ul>
        </div>

        <form action={onSubmit} className="md:w-1/2 space-y-10 text-[1.125rem]">
          {/* Full name */}
          <div>
            <input
              name="fullName"
              placeholder={t("Full name")}
              className={`w-full bg-transparent border-b focus:outline-none focus:border-white placeholder-white/70 py-3 border-white/50`}
            />
          </div>

          <div>
            <input
              name="email"
              placeholder={t("Email")}
              className={`w-full bg-transparent border-b focus:outline-none focus:border-white placeholder-white/70 py-3 "border-white/50"`}
            />
          </div>

          <div>
            <input
              name="company"
              placeholder={t("Company")}
              className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white placeholder-white/70 py-3"
            />
          </div>

          <div>
            <textarea
              rows={4}
              name="message"
              placeholder={t("Message")}
              className={`w-full bg-transparent border-b  focus:outline-none focus:border-white placeholder-white/70 py-3 resize-none border-white/50`}
            />
          </div>

          <button
            className="border border-white text-white px-10 py-3 rounded-full hover:bg-white hover:text-[#0F72B2] transition disabled:opacity-50 cursor-pointer"
          >
           {t("Send")}
          </button>
        </form>
      </div>
    </section>
  );
}
