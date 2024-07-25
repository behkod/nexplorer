import { notFound } from "next/navigation";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isAddress } from "web3-validator";

async function getData(address: string, network: string): Promise<Transaction[]> {
    const url = "https://" + network + "-mainnet.g.alchemy.com/v2/uKbv3FEN6aHxTfRRDqZDDlfUiaWHUiuS";
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "id": 1,
            "jsonrpc": "2.0",
            "method": "alchemy_getAssetTransfers",
            "params": [
                {
                    "fromBlock": "0x0",
                    "toBlock": "latest",
                    "toAddress": address,
                    "withMetadata": true,
                    "excludeZeroValue": true,
                    "maxCount": "0x3e8",
                    "category": [
                        "external", "internal", "erc20", "erc721"
                    ],
                    "order": "desc"
                }
            ]
        })
    };
    return (await (await fetch(url, requestOptions)).json()).result.transfers.map((item: any) => (
        {
            "network": network,
            "id": item.hash,
            "txhash": item.hash,
            "block": item.blockNum / 1,
            "time": item.metadata.blockTimestamp,
            "from": item.from,
            "to": item.to,
            "amount": item.value,
            "asset": item.asset,
        }
    ));
}

export default async function Page({ params }: { params: { address: string } }) {
    if (!isAddress(params.address)) {
        notFound();
    }
    const data1 = await getData(params.address, "eth");
    const data2 = await getData(params.address, "polygon");

    return (
        <div className="container mx-auto py-10">
            <Tabs defaultValue="ethereum" className="w-auto">
                <TabsList>
                    <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                    <TabsTrigger value="polygon">Polygon</TabsTrigger>
                </TabsList>
                <TabsContent value="ethereum">
                    You are currently viewing the transactions of this address on Ethereum Mainnet.
                    <DataTable columns={columns} data={data1} />
                </TabsContent>
                <TabsContent value="polygon">
                    You are currently viewing the transactions of this address on Polygon Mainnet.
                    <DataTable columns={columns} data={data2} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
