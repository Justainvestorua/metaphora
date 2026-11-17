"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import CinematicSequence from "./CinematicSequence";
import { Nav, Footer } from "./Chrome";
import { Inquiry } from "./Sections";
import { attachInquiryArrival } from "@/lib/animations/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home({ t }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const detach = attachInquiryArrival(
          ScrollTrigger,
          root.current?.querySelector("#inquiry")
        );
        return () => detach();
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Nav t={t} />
      <main id="main">
        <CinematicSequence t={t} />
        <Inquiry t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
