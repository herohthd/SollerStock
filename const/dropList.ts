import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
// fetching the key from the environment variable
const walletPrivateKey: string = "4HmNwbPVM6142w39AiZqSdQgaz684L1jSDraMMYcDYwFccoog1KexJt8iFdN7BU5JNXqf3ZXJvDPDNqu42baHtFE";
// Initializing the SDK and passing in the signer 
const sdk = ThirdwebSDK.fromPrivateKey("devnet", walletPrivateKey);
const imageList = ["FmGMAHw2gnkEp1MRMEfAy838nZ8FH6TnooTaQgyFwAgR",
    "7eF7aF8Gt49MBYGmbZMjnC2KMBb8yobkE1LdF8bq7T7M",
    "4KNDzfSULeENKbuC5ZnBEFUTKMhMX7zL9Z2ZcP8NcRAj",
    "8pdrKtqWQuxaaS1pp4SSCZjoE92zsJZJnyPDeCcELQte"];
const gifList = ["HC7PFUuvpac84otjxPKDjMa3Zv6xZLhmDqEij3ajxWTp"] 
const videoList = ["5T215QnfPwhLm8ftbh2nmB4pNXguGJTUR5XkZYYkdKLm"]

function getDropList() {
    const dropCollectionMetadata: any = {
        "image": [],
        "video": [],
        "gif": []
    }
    imageList.forEach(async (drop) => {
        const program = await sdk.getNFTDrop(drop);
        const royalty = await program.getRoyalty();
        const metadata = await program.getMetadata();
        const conditions = await program.claimConditions.get();
        metadata["royalty"] = royalty
        metadata["condition"] = conditions
        metadata["contractAddress"] = drop
        dropCollectionMetadata.image.push(metadata)
    })
    gifList.forEach(async (drop) => {
        const program = await sdk.getNFTDrop(drop);
        const royalty = await program.getRoyalty();
        const metadata = await program.getMetadata();
        const conditions = await program.claimConditions.get();
        metadata["royalty"] = royalty
        metadata["condition"] = conditions
        metadata["contractAddress"] = drop
        dropCollectionMetadata.gif.push(metadata)
    })
    videoList.forEach(async (drop) => {
        const program = await sdk.getNFTDrop(drop);
        const royalty = await program.getRoyalty();
        const metadata = await program.getMetadata();
        const conditions = await program.claimConditions.get();
        metadata["royalty"] = royalty
        metadata["condition"] = conditions
        metadata["contractAddress"] = drop
        dropCollectionMetadata.video.push(metadata)
    })
    return dropCollectionMetadata;
}
export const dropCollectionMetadata = getDropList();