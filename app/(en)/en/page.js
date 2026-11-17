import Home from "@/components/Home";
import { dictionaries, SITE } from "@/lib/content";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { alternatesFor } from "@/lib/seo";

const t = dictionaries.en;

export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: alternatesFor("en"),
  openGraph: {
    type: "website",
    locale: "en",
    url: `${SITE.url}/en`,
    siteName: SITE.name,
    title: t.meta.title,
    description: t.meta.description,
    images: [{ url: "/img/f03-1920.webp", width: 1920, height: 1082, alt: t.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.title,
    description: t.meta.description,
    images: ["/img/f03-1920.webp"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema("en"), websiteSchema("en")]),
        }}
      />
      <Home t={t} />
    </>
  );
}
