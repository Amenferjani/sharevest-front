import CompanyDetailsPage from "@/components/dashboard/subsidiaries/sub-pages/company-details-page";

export default function CompanyDetails({ params }: { params: { id: string } }) {
    return <CompanyDetailsPage companyId={params.id} />
}
