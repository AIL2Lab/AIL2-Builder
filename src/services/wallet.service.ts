import { request } from "@/lib/request";

export interface Props {
  address: string;
}

export const connectWalletNoSig = (params: Props) => {
  return request.post<{ token: string; address: string }>("/auth/wallet-connect-no-sig", params);
};
