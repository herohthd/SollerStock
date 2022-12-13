import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useClaimNFT,
  useProgram,
  useUser,
} from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from 'react';
import { programAddress } from "../const/yourDetails";
import styles from "../styles/Home.module.css";
import { InputNumber, Col, Layout, Row, Space, Input, Button } from 'antd'
import 'antd/dist/antd.css';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

const Create: NextPage = () => {
  const { user, isLoading: userLoading } = useUser();
  const program = useProgram(programAddress, "nft-drop");

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [itemsAvailable, setItemsAvailable] = useState<any>(0)
  // fetching the key from the environment variable
  const walletPrivateKey:string = "4HmNwbPVM6142w39AiZqSdQgaz684L1jSDraMMYcDYwFccoog1KexJt8iFdN7BU5JNXqf3ZXJvDPDNqu42baHtFE";
  // Initializing the SDK and passing in the signer 
  const sdk = ThirdwebSDK.fromPrivateKey("devnet", walletPrivateKey);

  const createNftDrop = async() => {
    const programMetadata = {
      name: name,
      symbol: symbol,
      description: description,
      totalSupply: itemsAvailable,
    };
    // Here we will get the address of the deployed program by passing
    // the programMetadata in the createNftDrop hook that the sdk provides
    const address = await sdk.deployer.createNftDrop(programMetadata);
    // Logging the address to the terminal console
    console.log("Program Address: ", address);
  };
  if (userLoading) return <></>;

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col flex="auto">
                <Link href="/login" passHref ><div className={styles.h1}>SollerStock</div></Link>
            </Col>
            <Col>
              <WalletMultiButton />
            </Col>

          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Row gutter={[24, 24]}>
            <Col>Name: </Col>
            <Col flex="auto">
              <Input placeholder="Name" 
              onChange={(e) => setName(e.target.value)}/>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Symbol: </Col>
            <Col flex="auto">
              <Input placeholder="Symbol" 
              onChange={(e) => setSymbol(e.target.value)}/>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Description: </Col>
            <Col flex="auto">
              <Input placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}/>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Available Items: </Col>
            <Col flex="auto">
              <InputNumber min={0} defaultValue={0}
              onChange={(value) => {
                setItemsAvailable(value)
              }}/>
            </Col>
          </Row>
          <Col>
            <Button type="primary" onClick={createNftDrop}>Submit</Button>
          </Col>
        </Col>


      </Row>
    </div>
  );
};

export default Create;
