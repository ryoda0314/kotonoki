import Link from "next/link";
import { SITE } from "@/content/site";

/** As ことのあめ's, with the way back to the apps. */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
        maxWidth: 480,
        margin: "0 auto",
        padding: "48px 20px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600 }}>{SITE.notFound}</h1>
      <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>{SITE.notFoundLead}</p>
      <Link href="/" className="btn" style={{ alignSelf: "flex-start" }}>
        {SITE.home}
      </Link>
    </main>
  );
}
