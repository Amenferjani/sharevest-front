import { useState } from "react";
import { HedgeFund, FundStrategy, FundStatus, RiskLevel } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FundFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<HedgeFund>) => void;
    fund?: HedgeFund | null;
}

export function FundFormModal({ isOpen, onClose, onSubmit, fund }: FundFormModalProps) {
    const [formData, setFormData] = useState<Partial<HedgeFund>>(
        fund || {
            name: "",
            manager: "",
            description: "",
            strategy: "long-short-equity",
            totalAssets: 0,
            investedAmount: 0,
            managementFees: 2.0,
            performanceFees: 20.0,
            status: "active",
            riskLevel: "medium",
            minimumInvestment: 1000000,
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name.includes("Fees") || name.includes("Amount") || name.includes("Assets")
                ? parseFloat(value)
                : value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const strategies: FundStrategy[] = [
        "long-short-equity",
        "global-macro",
        "event-driven",
        "fixed-income",
        "multi-strategy",
        "quantitative"
    ];

    const statuses: FundStatus[] = ["active", "closed", "suspended", "liquidating"];
    const riskLevels: RiskLevel[] = ["low", "medium", "high", "very-high"];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{fund ? "Edit Fund" : "Create New Fund"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Fund Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Alpha Growth Partners"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="manager">Fund Manager</Label>
                            <Input
                                id="manager"
                                name="manager"
                                value={formData.manager}
                                onChange={handleChange}
                                placeholder="Sarah Chen"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Fund strategy and objectives..."
                            rows={3}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="strategy">Strategy</Label>
                            <Select
                                value={formData.strategy}
                                onValueChange={(value) => handleSelectChange("strategy", value as FundStrategy)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select strategy" />
                                </SelectTrigger>
                                <SelectContent>
                                    {strategies.map((strategy) => (
                                        <SelectItem key={strategy} value={strategy}>
                                            {strategy.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleSelectChange("status", value as FundStatus)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="totalAssets">Total Assets ($)</Label>
                            <Input
                                id="totalAssets"
                                name="totalAssets"
                                type="number"
                                value={formData.totalAssets}
                                onChange={handleChange}
                                min="0"
                                step="1000000"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="managementFees">Management Fee (%)</Label>
                            <Input
                                id="managementFees"
                                name="managementFees"
                                type="number"
                                value={formData.managementFees}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                step="0.1"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="performanceFees">Performance Fee (%)</Label>
                            <Input
                                id="performanceFees"
                                name="performanceFees"
                                type="number"
                                value={formData.performanceFees}
                                onChange={handleChange}
                                min="0"
                                max="50"
                                step="0.1"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="riskLevel">Risk Level</Label>
                            <Select
                                value={formData.riskLevel}
                                onValueChange={(value) => handleSelectChange("riskLevel", value as RiskLevel)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select risk level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {riskLevels.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="minimumInvestment">Minimum Investment ($)</Label>
                            <Input
                                id="minimumInvestment"
                                name="minimumInvestment"
                                type="number"
                                value={formData.minimumInvestment}
                                onChange={handleChange}
                                min="0"
                                step="100000"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {fund ? "Update Fund" : "Create Fund"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}