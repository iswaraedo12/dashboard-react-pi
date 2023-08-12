/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import { Space, Table, Tag } from "antd";

import { api } from "config/config";
import { useEffect, useState } from "react";
import axios from "axios";
import sha256 from "js-sha256";

const Tables = () => {
  const [data, setData] = useState();

  const email = "admin@email.com";
  const password = "admin123";

  // Concatenate email and password
  const dataToHash = email + password;
  const sha256Hash = sha256(dataToHash);

  // Base64 encode the hash
  const base64Encrypt = btoa(sha256Hash);

  const fetchData = async () => {
    try {
      const data = await axios({
        url: api.get,
        method: "GET",
      });

      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("RESULT =", base64Encrypt);
  }, []);

  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      width: 100,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      key: "body",
      dataIndex: "body",
    },
  ];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Table</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="info" href="#pablo" onClick={(e) => e.preventDefault()} size="md">
                      Add New
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="thead-light test-sm p-2" columns={columns} dataSource={data} rowKey={"id"} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
