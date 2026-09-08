import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking";
import {
  fetchPublicMasterProfile,
  fetchServices,
  fetchAvailableDates,
} from "@/lib/api";
import type { IPublicMasterProfile, IService } from "@/lib/types";

interface PageProps {
  params: Promise<{ masterToken: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { masterToken } = await params;
  try {
    const profile = await fetchPublicMasterProfile(masterToken);
    const description =
      profile.contact.about ||
      `Онлайн-запис на послуги до майстра ${profile.name}. Оберіть зручний час та забронюйте візит онлайн.`;

    const imageUrl = profile.cover_url || profile.avatar_url || "/og-image.png";

    return {
      title: `Онлайн-запис — ${profile.name}`,
      description,
      alternates: {
        canonical: `/m/${masterToken}`,
      },
      openGraph: {
        title: `Онлайн-запис — ${profile.name}`,
        description,
        type: "profile",
        url: `https://bookeasy.com.ua/m/${masterToken}`,
        images: [{ url: imageUrl }],
      },
      twitter: {
        card: "summary_large_image",
        title: `Онлайн-запис — ${profile.name}`,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Сторінку майстра не знайдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function MasterPage({ params }: PageProps) {
  const { masterToken } = await params;

  let profile: IPublicMasterProfile;
  try {
    profile = await fetchPublicMasterProfile(masterToken);
  } catch (error) {
    console.error("[MasterPage Error] Failed to fetch master profile:", error);
    notFound();
  }

  const [services, availableDates] = await Promise.all([
    fetchServices(profile.master_id).catch(() => [] as IService[]),
    fetchAvailableDates(profile.master_id).catch(() => [] as string[]),
  ]);

  let priceRange: string | undefined = undefined;
  if (services.length > 0) {
    const prices = services.map((s) => s.price);
    const min = Math.min(...prices) / 100;
    const max = Math.max(...prices) / 100;
    priceRange = min === max ? `${min} UAH` : `${min} - ${max} UAH`;
  }
  const currentUrl = `https://bookeasy.com.ua/m/${masterToken}`;
  const sameAs = [
    profile.contact?.instagram_link,
    profile.contact?.telegram_link,
    profile.contact?.google_maps_link,
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": currentUrl,
    name: profile.name,
    ...(currentUrl ? { url: currentUrl } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(priceRange ? { priceRange } : {}),
    ...(profile.avatar_url || profile.cover_url
      ? { image: profile.avatar_url || profile.cover_url }
      : {}),
    ...(profile.contact?.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: profile.contact.address,
            addressCountry: "UA",
          },
        }
      : {}),
    ...(profile.contact?.about ? { description: profile.contact.about } : {}),
    ...(profile.contact?.phone_number ? { telephone: profile.contact.phone_number } : {}),
    ...(services.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Послуги майстра",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  ...(service.description ? { description: service.description } : {}),
                },
                price: (service.price / 100).toFixed(2),
                priceCurrency: "UAH",
                availability: "https://schema.org/InStock",
              },
            })),
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BookingFlow
        masterId={profile.master_id}
        masterInfo={profile}
        services={services}
        availableDates={availableDates}
        showContactForm={true}
      />
    </>
  );
}
