import { Eye, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { HedgeFund } from '@/types/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

interface FundListProps {
    funds: HedgeFund[];
    onDelete: (fundId: string) => void;
}

export default function FundList({ funds, onDelete }: FundListProps) {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fund Name</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Strategy</TableHead>
                        <TableHead>Total AUM</TableHead>
                        <TableHead>Inception Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {funds.map((fund) => (
                        <TableRow key={fund.id}>
                            <TableCell className="font-medium">
                                <Link
                                    href={`/hedge-manager/funds/${fund.id}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    {fund.name}
                                </Link>
                            </TableCell>
                            <TableCell>{fund.manager}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{fund.strategy}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3 text-gray-400" />
                                    {formatCurrency(fund.totalAssets)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-gray-400" />
                                    {formatDate(fund.inceptionDate)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={fund.status === 'Active' ? 'default' : 'secondary'}>
                                    {fund.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/hedge-manager/funds/${fund.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(fund.id!)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}