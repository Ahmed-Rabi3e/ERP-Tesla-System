import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600; // 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const title = "About — Tesla Medical";
  return {
    title,
    description:
      "Tesla Medical Company builds and supports high-quality biomedical equipment for clinics and hospitals.",
    openGraph: {
      title,
      description:
        "Tesla Medical Company builds and supports high-quality biomedical equipment for clinics and hospitals.",
      url: "https://teslamedical.com/about",
      images: ["/assets/hero-about.webp"],
    },
    alternates: { canonical: "/about" },
  };
}

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tesla Medical Company",
    url: "https://teslamedical.com",
    logo: "https://teslamedical.com/assets/tesla.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-555-123-4567",
        contactType: "customer service",
      },
    ],
    sameAs: [
      "https://facebook.com",
      "https://twitter.com",
      "https://linkedin.com",
    ],
  } as const;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-stone-50 text-neutral-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
          <div className="space-y-6">
            <div className="mt-8">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight !font-heading">
                Helping hospitals
                <br />
                deliver better care
              </h1>
              <p className="text-lg text-neutral-700 max-w-xl mt-4">
                Tesla Medical Company builds and supports high-quality
                biomedical equipment for clinics and hospitals. We focus on
                reliability, serviceability, and human-centered design so
                clinicians can focus on patients.
              </p>
            </div>
            <p className="text-base text-neutral-700">
              We deliver diagnostic, monitoring, laboratory, and therapeutic
              equipment that meets international standards with responsive
              technical service and training.
            </p>

            <nav aria-label="About actions" className="flex gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-full"
              >
                See products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border px-4 py-2 rounded-full"
              >
                Contact sales
              </Link>
            </nav>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
            <div className="w-full h-80 lg:h-[420px]">
              <Image
                src="/assets/hero-about.webp"
                alt="Team"
                width={1200}
                height={800}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">Trusted quality</h2>
            <p className="text-sm text-neutral-600">
              Devices tested to international standards and backed by fast
              technical support.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">Service & training</h2>
            <p className="text-sm text-neutral-600">
              On-site setup, preventive maintenance, and staff training for
              seamless adoption.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">
              Human-centered design
            </h2>
            <p className="text-sm text-neutral-600">
              Equipment designed around clinical workflows to reduce errors and
              improve efficiency.
            </p>
          </article>
        </section>

        <section className="mt-20 bg-gradient-to-tr from-white/80 via-pink-50/60 to-white/80 rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Meet the team</h2>
            <p className="mt-3 text-neutral-700 max-w-xl">
              Our engineers, service technicians, and clinical liaisons work
              together to deliver products and support hospitals need.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border px-4 py-2 rounded-full"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/assets/tesla.png"
              alt="Logo"
              width={800}
              height={800}
              className="object-cover w-full h-56"
            />
          </div>
        </section>
      </section>
    </main>
  );
}
