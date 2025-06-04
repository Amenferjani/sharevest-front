import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Plus } from "lucide-react";

interface EmptyFundsListProps {
    searchTerm: string;
    onCreateNew: () => void;
}

export function EmptyFundsList({ searchTerm, onCreateNew }: EmptyFundsListProps) {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No funds found</h3>
                <p className="text-muted-foreground text-center mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first hedge fund to get started"}
                </p>
                {!searchTerm && (
                    <Button onClick={onCreateNew}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Fund
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}