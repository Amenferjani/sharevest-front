import FundDetailPage from "@/components/hedge-manager/sub-pages/fund-details-page";

export default function FundDetail({ params }: { params: { id: string } }) {
    return <FundDetailPage fundId={ params.id} />
}
