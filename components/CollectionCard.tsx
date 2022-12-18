import React, { FC, useEffect, useState } from "react";
import { Card } from 'antd';
import {
  useClaimNFT,
  useLogin
} from "@thirdweb-dev/react/solana";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
// fetching the key from the environment variable
const walletPrivateKey: string = "4HmNwbPVM6142w39AiZqSdQgaz684L1jSDraMMYcDYwFccoog1KexJt8iFdN7BU5JNXqf3ZXJvDPDNqu42baHtFE";
// Initializing the SDK and passing in the signer 
const sdk = ThirdwebSDK.fromPrivateKey("devnet", walletPrivateKey);
import { Col, Row, Button } from 'antd'
const { Meta } = Card;
interface Props {
  name: string,
  description: string,
  symbol: string,
  image: string,
  uri: string,
  condition: any,
  contractAddress: any,
  isVideo?: boolean,
}
const CollectionCard: FC<Props> = ({ name, description, symbol, image, uri, condition, contractAddress, isVideo }) => {
  const [program, setProgram] = useState<any>()
  const login = useLogin()
  useEffect(() => {
    const genRandomKey = async () => {
      setProgram(await sdk.getNFTDrop(contractAddress));
      // const { mutate, isLoading } = useClaimNFT(program.data);
    };

    genRandomKey();
  }, [contractAddress]);
  const { mutate, isLoading } = useClaimNFT(program);
  return (
    <Card
      title={name}
      hoverable
      style={{ width: 240 }}
      cover={isVideo ? <video src={image} preload="auto" controls/> : <img alt="example" src={image} />}
    >
      
      <Meta description={description} />
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col>
          <Row>Price</Row>
          <Row><b>{parseFloat(condition.price.displayValue)} SOL</b></Row>
        </Col>
        <Col>
          <Row>Editions</Row>
          <Row>{condition.claimedSupply}/{condition.totalAvailableSupply}</Row>
        </Col>
      </Row>
      <Row style={{ display:"flex",justifyContent:"center",padding:"12px" }}>
        <Button
          type="primary"
          onClick={() =>
            mutate({
              amount: 1,
            })
          }
        >
          {isLoading ? "Claiming..." : "Claim NFT"}
        </Button>
        <Button
          style={{marginTop:"12px"}}
          type="primary"
          onClick={() =>
            login()
          }
        >
          View collection
        </Button>
      </Row>
    </Card>
  )
};

export default CollectionCard;

