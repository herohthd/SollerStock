import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useClaimNFT,
  useLogin,
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

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { user, isLoading: userLoading } = useUser();
  const login = useLogin();
  const program = useProgram(programAddress, "nft-drop");
  const { mutate, isLoading } = useClaimNFT(program.data);

  if (userLoading) return <></>;

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col flex="auto">
              <h1 className={styles.h1}>SollerStock</h1>
            </Col>
            <Col>
              <Link href="/createCollection" passHref>
                Create collection
              </Link>
            </Col>
            <Col>
              <WalletMultiButton />
              {/* {!publicKey && <WalletMultiButton />}
                {publicKey && !user && (
                  <button className={styles.button} onClick={() => login()}>
                    Login
                  </button>
                  )}

                {user && <p>Logged in as {user.address} </p>} */}
            </Col>

          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          {/* {user && (
          <button
            onClick={() =>
              mutate({
                amount: 1,
              })
            }
            className={styles.button}
          >
            {isLoading ? "Claiming..." : "Claim NFT"}
          </button>
          )}
          <Link href="/" passHref className={styles.lightPurple}>
            Protected Page
          </Link> */}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
