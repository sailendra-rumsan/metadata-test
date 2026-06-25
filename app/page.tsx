import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}): Promise<Metadata> {
  const query = await searchParams;
  let schoolName = query?.name as string | undefined;
  if (schoolName) {
    try {
      schoolName = decodeURIComponent(schoolName.replace(/\+/g, " ")).trim();
    } catch {
      schoolName = schoolName.replace(/\+/g, " ").trim();
    }
  }

  const title = schoolName
    ? `Join ${schoolName}'s recycling program`
    : "Join your community's recycling program";
  const description = schoolName
    ? `Help reduce plastic waste by bringing your used plastic to ${schoolName}. Sign up now and Plastic Bank will automatically prevent 50 plastic bottles from entering the environment.`
    : `Help reduce plastic waste by bringing your used plastic to your school. Sign up now and Plastic Bank will automatically prevent 50 plastic bottles from entering the environment.`;

  const metadataBase = process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");
  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Test 101",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Hello World
      </main>
    </div>
  );
}
