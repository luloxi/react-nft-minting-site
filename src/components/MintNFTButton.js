import * as React from "react";
import { ethers, BigNumber } from "ethers";
import { Button } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function MintNFTButton({ mintAmount, abi, contractAddress }) {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    args: [
      BigNumber.from(mintAmount),
      {
        value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
      },
    ],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <Button
        backgroundColor="#D6517D"
        borderRadius="5px"
        boxShadow="0px 2px 2px 1px #0F0F0F"
        color="white"
        cursor="pointer"
        fontFamily="inherit"
        padding="15px"
        marginTop="10px"
        disabled={!write || isLoading}
        onClick={() => write()}
      >
        {isLoading ? "Minting..." : "Mint"}
      </Button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  );
}
