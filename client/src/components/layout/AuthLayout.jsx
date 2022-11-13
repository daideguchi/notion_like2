import { Box, Container } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import notionLogo from "../..//assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //JWTを持っているか確認する（ログインが有効なら直接ホームへ）
    const chekAuth = async () => {
      //認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }
    };
    chekAuth();
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 6,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={notionLogo}
          alt="notion logo"
          style={{ width: 100, height: 100, mb: 3 }}
        />
        notionクローン開発
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
