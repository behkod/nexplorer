"use client"

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Transaction = {
    network: string
    id: string
    txhash: string
    block: number
    time: string
    from: string
    to: string
    amount: number
    asset: string
};

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "network",
        header: "Net",
    },
    {
        accessorKey: "txhash",
        header: "TX Hash",
        cell: ({ row }) => {
            const amount = row.getValue("txhash") + "";
            const hrefValue = "/tx/" + amount + "?net=" + row.getValue("network");
            const formatted = amount.substr(0, 6) + "..." + amount.substr(-6);
            return <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={hrefValue}>{formatted}</Link>
        },
    },
    {
        accessorKey: "block",
        header: ({ column }) => {
            return (
                <Button variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Block <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "time",
        header: ({ column }) => {
            return (
                <Button variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Time <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount: Date = new Date(row.getValue("time"));
            return <div className="font-medium">{amount.toString()}</div>
        },
    },
    {
        accessorKey: "from",
        header: "From",
        cell: ({ row }) => {
            const amount = row.getValue("from") + "";
            const hrefValue = "/address/" + amount;
            const formatted = amount.substr(0, 4) + "..." + amount.substr(-4);
            return <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={hrefValue}>{formatted}</Link>
        },
    },
    {
        accessorKey: "to",
        header: "To",
        cell: ({ row }) => {
            const amount = row.getValue("to") + "";
            const hrefValue = "/address/" + amount;
            const formatted = amount.substr(0, 4) + "..." + amount.substr(-4);
            return <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={hrefValue}>{formatted}</Link>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = row.getValue("amount") + "";
            const formatted = amount.substring(0, 9);
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "asset",
        header: "Asset",
    },
];
