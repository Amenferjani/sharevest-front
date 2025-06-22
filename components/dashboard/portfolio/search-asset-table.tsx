"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PlusCircle, Info, X, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import assets from "@/data/assets.prod.json";
import Fuse from "fuse.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addAssetToPortfolio, getMarketData } from "@/services/portfolio/service";
import { Label } from "@/components/ui/label";
import { Asset } from "@/types/types";
import { createCheckoutSession } from "@/services/stripe/service";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

// Removed opportunities and filters

const InvestButton = ({ portfolioId, asset }: { portfolioId: string, asset: Asset }) => {
  const router = useRouter()
  const {user} = useAuth()
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState({
      amount: 0,
      currency: "USD",
      name: '',
      userId: '',
      email: '',
        });


  const addAssetMutation = useMutation({
    mutationFn: addAssetToPortfolio,
    onSuccess: () => {
      setOpen(false);
    },
    onError: (err: any) => {
      console.error("Failed to add asset:", err);
    },
  });

  const reqCheckoutMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      router.push(data);
    },
  });

  const handleConfirmInvestment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalInvestment = quantity * asset.currentPrice;
    addAssetMutation.mutate({ portfolioId: portfolioId, asset: { ...asset, quantity: quantity } });
    // if(!user) return
    // setPayment({ amount: totalInvestment , name : "amen ferjani" , userId : user.id! , email: user.email , currency : 'USD'})
    // reqCheckoutMutation.mutate()
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Invest
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-black border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Invest in {asset.name}</DialogTitle>
          <DialogDescription className="text-zinc-400 pt-2">
            Enter the quantity of shares you would like to purchase.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirmInvestment} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-zinc-300">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="1"
              className="bg-zinc-800 border-zinc-700 text-white focus-visible:ring-emerald-500"
            />
          </div>
          <div className="rounded-md bg-black p-3 border border-zinc-700">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300">Price per share:</span>
              <span className="text-white font-medium">${asset?.currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2 text-lg">
              <span className="text-zinc-300">Total investment:</span>
              <span className="text-emerald-400 font-bold">${(quantity * asset.currentPrice).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
              Confirm Investment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AssetSearchTable({ portfolioId }: { portfolioId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [finalQuery, setFinalQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const autocompleteSymbol = (searchInput: string) => {
    return assets.filter(symbol =>
      symbol.toLowerCase().startsWith(searchInput.toLowerCase())
    );
  }

  const fuse = new Fuse(assets.map(symbol => ({ symbol })), {
    keys: ["symbol"],
    threshold: 0.3,
  });

  const fuzzySearchSymbol = (searchInput: string) => {
    const result = fuse.search(searchInput);
    return result.map(r => r.item.symbol);
  }

  const handleSymbolSearch = (searchInput: string) => {
    let results = autocompleteSymbol(searchInput);
    if (results.length === 0) {
      results = fuzzySearchSymbol(searchInput);
    }
    return results;
  }

  const handleClearSearch = () => {
    setSearchQuery("");
    setFinalQuery("");
  };

  const handleSearchSubmit = () => {
    setFinalQuery(searchQuery);
  };

  const { data: searchAsset, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ["asset-prices", finalQuery],
    queryFn: async () => getMarketData(finalQuery),
    enabled: !!finalQuery,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex items-center gap-2 relative">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              const results = handleSymbolSearch(e.target.value);
              setSearchResults(results);
            }}
            placeholder="Search investments..."
            className="pl-9 pr-12 h-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full aspect-square rounded-l-none"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          className="h-12 px-6 bg-emerald-700 hover:bg-emerald-600 text-white"
          disabled={!searchQuery.trim()}
          onClick={handleSearchSubmit}
        >
          Search
        </Button>
      </div>
      <div className="relative">
        {/* Suggestions Dropdown */}
        {searchQuery && searchResults.length > 0 && (
          <div className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-md max-h-60 overflow-y-auto">
            {searchResults.map((symbol) => (
              <div
                key={symbol}
                onClick={() => {
                  setSearchQuery(symbol)
                  setSearchResults([]);
                }}
                className="px-4 py-2 hover:bg-zinc-900 cursor-pointer text-sm font-medium"
              >
                {symbol}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table for Search Result */}
      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Latest Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                    <span className="text-sm text-muted-foreground">Loading asset...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {searchError && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-red-500">
                  Error fetching asset.
                </TableCell>
              </TableRow>
            )}
            {searchAsset && !searchLoading && !searchError && (
              <TableRow key={searchAsset.symbol} className="hover:bg-muted/40">
                <TableCell className="font-medium">{searchAsset.companyName}</TableCell>
                <TableCell>
                  {searchAsset.assetType === "Common Stock" ? "Stock" : searchAsset.assetType}
                </TableCell>
                <TableCell>{searchAsset.risk || '-'}</TableCell>
                <TableCell>{searchAsset.expectedReturn ? `${searchAsset.expectedReturn}%` : '-'}</TableCell>
                <TableCell>{searchAsset.latestPrice || '-'}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <Info className="h-4 w-4" />
                    </Button>
                    <InvestButton portfolioId={portfolioId} asset={{
                      name: `${searchAsset.companyName}`,
                      ticker: `${searchAsset.symbol}`,
                      type: searchAsset.assetType === "Common Stock" ? "Stock" : `${searchAsset.assetType}`,
                      currentPrice: searchAsset.latestPrice as number,
                      quantity: 0 as number,
                    }} />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {/* No opportunities, no default rows */}
            {!searchAsset && !searchLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

