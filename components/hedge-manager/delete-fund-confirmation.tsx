import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { HedgeFund } from '@/types/types';

interface DeleteFundConfirmationProps {
    fund: HedgeFund;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteFundConfirmation({
    fund,
    isOpen,
    onClose,
    onConfirm,
}: DeleteFundConfirmationProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <AlertDialogTitle>Delete Hedge Fund</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-2">
                        <p>
                            Are you sure you want to delete <strong>{fund.name}</strong>?
                        </p>
                        <p className="text-sm text-red-600">
                            This action cannot be undone. All associated performance metrics and data will be permanently deleted.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        Delete Fund
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}