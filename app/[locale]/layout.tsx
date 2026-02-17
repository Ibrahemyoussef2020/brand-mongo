import { notFound } from "next/navigation";
import ProvidersWrapper from "@/components/layout/ProvidersWrapper";
import Footer from "@/components/layout/Footer";

import { Locale } from "@/types";

const locales = ["en", "ar"];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <ProvidersWrapper locale={locale as Locale}>
      <div dir={locale === "ar" ? "rtl" : "ltr"}>
        {children}
        <Footer />
      </div>
    </ProvidersWrapper>
  );
}
