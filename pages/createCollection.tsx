import {
  useProgram,
  useUser,
} from "@thirdweb-dev/react/solana";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from 'react';
import styles from "../styles/Home.module.css";
import { InputNumber, Col, Row, Space, Input, Button } from 'antd'
import 'antd/dist/antd.css';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: 'Image',
    key: '1',
  },
  {
    label: 'Gif',
    key: '2',
  },
  {
    label: 'Video',
    key: '3',
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const Create: NextPage = () => {
  const { user, isLoading: userLoading } = useUser();
  const program: any = useProgram("HC7PFUuvpac84otjxPKDjMa3Zv6xZLhmDqEij3ajxWTp", "nft-drop")

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")
  const [itemsAvailable, setItemsAvailable] = useState<any>(0)
  const [contractAddress, setContractAddress] = useState<string>("")
  // fetching the key from the environment variable
  const walletPrivateKey: string = "4HmNwbPVM6142w39AiZqSdQgaz684L1jSDraMMYcDYwFccoog1KexJt8iFdN7BU5JNXqf3ZXJvDPDNqu42baHtFE";
  // Initializing the SDK and passing in the signer 
  const sdk = ThirdwebSDK.fromPrivateKey("devnet", walletPrivateKey);

  const createNftDrop = async () => {
    const programMetadata = {
      name: name,
      symbol: symbol,
      description: description,
      image: image,
      totalSupply: itemsAvailable,
    };
    console.log(programMetadata)
    // Here we will get the address of the deployed program by passing
    // the programMetadata in the createNftDrop hook that the sdk provides

    const address = await sdk.deployer.createNftDrop(programMetadata);
    setContractAddress(address)
    // Logging the address to the terminal console
    console.log("Program Address: ", address);

    const program = await sdk.getNFTDrop(address);
    const creators = await program.getCreators();
    console.log(creators);
    const metadata = await program.getMetadata();
    console.log(metadata);
  };
  if (userLoading) return <></>;

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col flex="auto" style={{ display: "flex", marginBottom: "12px", marginLeft: "12px" }}>
              <Link href="/login" passHref>
                <h1 className={styles.h1} style={{ color: "#C55A11" }}>SollerStock</h1>
              </Link>

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
                onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Symbol: </Col>
            <Col flex="auto">
              <Input placeholder="Symbol"
                onChange={(e) => setSymbol(e.target.value)} />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Description: </Col>
            <Col flex="auto">
              <Input placeholder="Description"
                onChange={(e) => setDescription(e.target.value)} />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Image: </Col>
            <Col flex="auto">
              <Input placeholder="Image"
                onChange={(e) => setImage(e.target.value)} />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Artifact: </Col>
            <Col flex="auto">
              <Input placeholder="Artifact"
                onChange={(e) => setPreview(e.target.value)} />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col>Type: </Col>
            <Col flex="auto">
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Type
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            </Col>
            
          </Row>

          <Row gutter={[24, 24]}>
            <Col>Available Items: </Col>
            <Col flex="auto">
              <InputNumber min={0} defaultValue={0}
                onChange={(value) => {
                  setItemsAvailable(value)
                }} />
            </Col>
          </Row>
          <Col>
            <Button type="primary" onClick={createNftDrop}>Submit</Button>
            <Col flex="auto">
              {contractAddress ?
                <Link href={'https://thirdweb.com/sol-devnet/' + { contractAddress }} passHref target="_blank">
                  Go to the collection setting
                </Link>
                :
                null}
            </Col>
          </Col>
        </Col>


      </Row>
    </div>
  );
};

export default Create;