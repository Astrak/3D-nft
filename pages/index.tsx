import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import json from '../artifacts/contracts/Nft3d.sol/Nft3d.json';
import App from '../components/App';
import { MUMBAI_CONTRACT } from '../constants';

export default function Home() {
  const { address } = useAccount();
  const router = useRouter();
  const { data } = useContractRead({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: json.abi,
    functionName: 'has3dNft',
    args: [address],
    enabled: address !== undefined,
  });
  const { openConnectModal } = useConnectModal();
  useEffect(() => {
    if (openConnectModal !== undefined) {
      openConnectModal();
    }
  }, [openConnectModal]);
  return <App />;
}
