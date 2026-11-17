import LegalPage from "@/components/LegalPage";
import { dictionaries } from "@/lib/content";
import { legal } from "@/lib/legal";

const t = dictionaries.en;
const doc = legal.en.terms;

export const metadata = {
  title: `${doc.title} — METAPHORA`,
  description: doc.lede,
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage t={t} doc={doc} />;
}
