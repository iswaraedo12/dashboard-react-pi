// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  // Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { Table, Input } from "antd";
import { useEffect, useState } from "react";
import { api } from "config/config";
import axios from "axios";

function currencyComma(e) {
  return (
    (e = (e = (e = String(e)).replace(/\$|\,/g, "")).replaceAll(" ", "")),
    (isNaN(e) || " " == e) && (e = "0"),
    e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const [data, setData] = useState([]);
  const [fishData, setFishData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios({
        url: api.seller.get,
        method: "GET",
      });

      if (data.status == "success") {
        setData(data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFishData = async () => {
    try {
      const { data } = await axios({
        url: api.fish.get,
        method: "GET",
      });

      if (data.status == "success") {
        setFishData(data.data);
      } else {
        setFishData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFishData();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Nama Toko",
      dataIndex: "seller_name",
      key: "seller_name",
    },
    {
      title: "Alamat Toko",
      dataIndex: "seller_address",
      key: "seller_address",
      width: 300,
    },
    {
      title: "Deskripsi Toko",
      dataIndex: "seller_description",
      key: "seller_description",
      width: 500,
    },
    {
      title: "Nomor Telepon Toko",
      dataIndex: "seller_phone",
      key: "seller_phone",
      width: 200,
    },
    {
      title: "Gambar",
      key: "image_path",
      dataIndex: "image_path",
      render: (text, record) => (
        <img
          src={`http://localhost:9050${record.image_path}`}
          alt={record.image_path}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];

  const fishColumns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Nama Ikan",
      dataIndex: "fish_name",
      key: "fish_name",
    },
    {
      title: "Jenis Ikan",
      dataIndex: "fish_type",
      key: "fish_type",
    },
    {
      title: "Ukuran Ikan",
      dataIndex: "fish_size",
      key: "fish_size",
      render: (text, v) => <span>{v.fish_size} cm</span>,
    },
    {
      title: "Harga Ikan",
      dataIndex: "fish_price",
      key: "fish_price",
      render: (text, v) => <span>Rp. {currencyComma(v.fish_price)}</span>,
    },
    {
      title: "Deskripsi",
      dataIndex: "fish_description",
      key: "fish_description",
      width: 500,
    },
    {
      title: "Gambar",
      key: "image_path",
      dataIndex: "image_path",
      render: (text, record) => (
        <img
          src={`http://localhost:9050${record.image_path}`}
          alt={record.image_path}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Daftar Toko</h3>
                  </div>
                  {/* <div className="col text-right">
                    <Button color="primary" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table
                className="thead-light test-sm p-2"
                columns={columns}
                dataSource={data}
                rowKey={"id"}
                locale={{ emptyText: "No Data Found" }}
                scroll={{ x: "max-content" }}
              />
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0 mt-5" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Daftar Ikan</h3>
                  </div>
                  {/* <div className="col text-right">
                    <Button color="primary" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table
                className="thead-light test-sm p-2"
                columns={fishColumns}
                dataSource={fishData}
                rowKey={"id"}
                locale={{ emptyText: "No Data Found" }}
                scroll={{ x: "max-content" }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
