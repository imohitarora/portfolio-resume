import ResumeComponent from "@/components/resume";
import { initialCVData } from "@/lib/data";

async function getPortfolioData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

export default async function Admin() {
  const portfolioData = await getPortfolioData();

  // If portfolioData is null, use initialCVData as fallback
  const initialData = portfolioData || initialCVData;

  return (
    <main>
      <ResumeComponent initialData={initialData} />
    </main>
  );
}
