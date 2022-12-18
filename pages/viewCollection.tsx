import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {useUser} from "@thirdweb-dev/react/solana";
import Link from "next/link";
import { dropCollectionMetadata } from "../const/dropList";
import styles from "../styles/Home.module.css";
import {Col, Row, Space } from 'antd'
import CollectionCard from '../components/CollectionCard'
import 'antd/dist/antd.css';
import React, { FC, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import type { NextPage } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";
import { programAddress } from "../const/yourDetails";

const Home: NextPage = () => {
  const router = useRouter()
  const { contractAddress } = router.query
  const { user, isLoading: userLoading } = useUser();
  if (userLoading) return <></>;
  
  return (
    <Col className={styles.container} >
      <Row gutter={[24, 24]}>
        <Col span={24} style={{ borderStyle: "outset" }}>
          <Row gutter={[24, 24]}>
            <Col flex="auto" style={{ display: "flex", marginBottom: "12px", marginLeft: "12px" }}>
              <h1 className={styles.h1} style={{ color: "#C55A11" }}>SollerStock</h1>
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <Link href="/createCollection" passHref>
                <h4 style={{ fontSize: ".9rem", fontWeight: "400", }}>Create collection</h4>
              </Link>
            </Col>
            <Col>
              <WalletMultiButton />
            </Col>

          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'center', padding: "80px" }}>
          <h3 style={{ justifyContent: "center", display: "flex", flexWrap: "wrap" }}>
            <span _ngcontent-rud-c55=""></span>
          </h3>
          <Space direction="horizontal" size={100} style={{ display: 'flex' }}>
            {dropCollectionMetadata["image"]?.map((data: any, i: any) => {
              // Return the element. Also pass key     
              return (<CollectionCard key={i} contractAddress={data.contractAddress} condition={data.condition} name={data.name} description={data.description} symbol={data.symbol} image={data.image} uri={data.uri} />)
            })}
          </Space>
        </Col>

        <Col span={24} style={{ textAlign: 'center', padding: "80px" }}>
          <h3 style={{ justifyContent: "space-between", display: "flex", flexWrap: "wrap" }}>
            <span _ngcontent-rud-c55="">Gif</span>
            <a href="/">view all »</a>
          </h3>
          <Space direction="horizontal" size={100} style={{ display: 'flex' }}>
            {dropCollectionMetadata["gif"]?.map((data: any, i: any) => {
              // Return the element. Also pass key     
              return (<CollectionCard key={i} contractAddress={data.contractAddress} condition={data.condition} name={data.name} description={data.description} symbol={data.symbol} image={data.image} uri={data.uri} />)
            })}
          </Space>
        </Col>

        <Col span={24} style={{ textAlign: 'center', padding: "80px" }}>
          <h3 style={{ justifyContent: "space-between", display: "flex", flexWrap: "wrap" }}>
            <span _ngcontent-rud-c55="">Video</span>
            <a href="/">view all »</a>
          </h3>
          <Space direction="horizontal" size={100} style={{ display: 'flex' }}>
            {dropCollectionMetadata["video"]?.map((data: any, i: any) => {
              // Return the element. Also pass key     
              return (<CollectionCard key={i} isVideo={true} contractAddress={data.contractAddress} condition={data.condition} name={data.name} description={data.description} symbol={data.symbol} image={data.image} uri={data.uri} />)
            })}
          </Space>
        </Col>
        
      </Row>
    </Col>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork("devnet");

  const user = await getUser(req);
  console.log(user)
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const program = await sdk.getNFTDrop(programAddress);
  const nfts = await program?.getAllClaimed();

  // const hasNFT = nfts?.some((nft) => nft.owner === user.address);
  const hasNFT = true
  if (!hasNFT) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
