// import { Badge } from "@/components/ui/badge"

// // This is a placeholder component that would be used in the main dashboard
// export default function InvestorsTable() {
//     const investors = [
//         {
//             id: "i1",
//             userId: "u1",
//             name: "John Smith",
//             email: "john.smith@investor.com",
//             phoneNumber: "415-555-9876",
//             investmentInterest: "Technology, Renewable Energy",
//             status: "active",
//             companyId: "c1",
//             createdAt: new Date("2023-05-10"),
//             updatedAt: new Date("2023-08-15"),
//         },
//         {
//             id: "i2",
//             userId: "u2",
//             name: "Sarah Johnson",
//             email: "sarah.johnson@investor.com",
//             phoneNumber: "512-555-3456",
//             investmentInterest: "Healthcare, Financial Technology",
//             status: "active",
//             companyId: "c2",
//             createdAt: new Date("2023-06-15"),
//             updatedAt: new Date("2023-09-01"),
//         },
//         {
//             id: "i3",
//             userId: "u3",
//             name: "Michael Chen",
//             email: "michael.chen@investor.com",
//             phoneNumber: "617-555-7890",
//             investmentInterest: "Technology, Healthcare",
//             status: "active",
//             companyId: "c3",
//             createdAt: new Date("2023-07-20"),
//             updatedAt: new Date("2023-09-10"),
//         },
//         {
//             id: "i4",
//             userId: "u4",
//             name: "Emily Rodriguez",
//             email: "emily.rodriguez@investor.com",
//             phoneNumber: "212-555-2345",
//             investmentInterest: "Financial Technology, Renewable Energy",
//             status: "active",
//             companyId: "c4",
//             createdAt: new Date("2023-08-05"),
//             updatedAt: new Date("2023-09-20"),
//         },
//     ]

//     const companies = {
//         c1: "TechInnovate Inc.",
//         c2: "GreenEnergy Solutions",
//         c3: "HealthPlus Medical",
//         c4: "FinTech Innovations",
//     }

//     return (
//         <div className="overflow-x-auto">
//             <table className="w-full">
//                 <thead>
//                     <tr className="border-b">
//                         <th className="text-left py-3 px-4 font-medium">Name</th>
//                         <th className="text-left py-3 px-4 font-medium">Email</th>
//                         <th className="text-left py-3 px-4 font-medium">Investment Interest</th>
//                         <th className="text-left py-3 px-4 font-medium">Company</th>
//                         <th className="text-left py-3 px-4 font-medium">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {investors.map((investor) => (
//                         <tr key={investor.id} className="border-b last:border-0">
//                             <td className="py-3 px-4">
//                                 <div className="font-medium">{investor.name}</div>
//                                 <div className="text-sm text-muted-foreground">{investor.phoneNumber}</div>
//                             </td>
//                             <td className="py-3 px-4">{investor.email}</td>
//                             <td className="py-3 px-4">{investor.investmentInterest}</td>
//                             <td className="py-3 px-4">{companies[investor.companyId as keyof typeof companies]}</td>
//                             <td className="py-3 px-4">
//                                 <Badge variant={investor.status === "active" ? "default" : "destructive"}>
//                                     {investor.status}
//                                 </Badge>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
