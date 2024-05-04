import React, { useState } from "react";
import "./User.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link, Outlet } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";

import Cookies from "js-cookie";
import {
  setAdminStatus,
  setLoginStatus,
  setUserDetails,
} from "../actions/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GrMoney } from "react-icons/gr";

import { IoIosLogOut } from "react-icons/io";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLogin = useSelector((state) => state.isLogin);
  const handleLogout = async () => {
    try {
      Cookies.remove("user_token");
      const res = await axios.post("http://localhost:5000/api/users/logout");
      dispatch(setAdminStatus(false));
      dispatch(setLoginStatus(false));
      dispatch(setUserDetails(""));
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  if (isAdmin === false && isLogin === true) {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ paddingTop: "10vh", backgroundColor: "black" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "black" }}
            className="sidebar-menu"
          >
            <Menu.Item
              key="1"
              icon={<GrMoney style={{ fontSize: "25px" }} />}
            >
              <Link to="/user/all-user-loan">All Loans</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<GiReceiveMoney style={{ fontSize: "25px" }} />}
            >
              <Link to="/user/get-loan">Request Loan</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={
                <IoIosLogOut
                  style={{ fontSize: "25px" }}
                  onClick={handleLogout}
                />
              }
            >
              <span onClick={handleLogout}>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header
            style={{
              padding: "0 4vw 0 0",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "white",
              }}
            />
            <h1 className="user-nav-logo">QuickCredit</h1>
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: "91vh",
              color: "#fff",
            }}
            className="user-content-main-container"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    navigate("/");
  }
};
export default UserLayout;
