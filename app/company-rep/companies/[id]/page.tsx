import CompanyEditPage from "@/components/company-rep/sub-pages/company-edit-page";

export default function CompanyEdit({ params }: { params: { id: string } }) {
    return <CompanyEditPage companyId={params.id} />
}
