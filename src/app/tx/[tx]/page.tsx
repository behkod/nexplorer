import { notFound } from "next/navigation";
import { hexToNumber, hexToNumberString } from "web3-utils";

async function getData(txhash: string, network: string) {
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
            "method": "eth_getTransactionReceipt",
            "params": [txhash]
        })
    };
    return (await (await fetch(url, requestOptions)).json()).result;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { tx: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    if ((searchParams.net != "eth" && searchParams.net != "polygon") || (searchParams.net == null)) {
        throw notFound();
    }
    const tx = params.tx;
    const net = searchParams.net!;
    const data = await getData(tx, net);

    if (data == null) {
        throw notFound();
    }
    const blockExplorerDomain = (net == "eth") ? "https://etherscan.io/tx/" : "https://polygonscan.com/tx/";
    return (
        <div className="container mx-auto py-10">
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7">Transaction Details</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 ">Amount, Addresses, Fees, Status ...</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">TX Hash</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{data.transactionHash}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Block Number</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{hexToNumberString(data.blockNumber)}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">From Address</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{data.from}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">Status</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                                {hexToNumber(data.status) ? "success" : "failure"}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6">More info:</dt>
                            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                                <a href={blockExplorerDomain + data.transactionHash}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Click here</a></dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
