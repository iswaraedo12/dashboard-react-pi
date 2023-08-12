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

import { Modal, Table } from "antd";

import { api } from "config/config";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreate from "components/Modal/ModalCreate";
import { DeleteFilled, EditFilled, EditOutlined } from "@ant-design/icons";
import ModalUpdate from "components/Modal/ModalUpdate";
import Swal from "sweetalert2";
import ModalFishCreate from "components/Modal/ModalFishCreate";
import ModalFishUpdate from "components/Modal/ModalFishUpdate";

function currencyComma(e) {
  return (
    (e = (e = (e = String(e)).replace(/\$|\,/g, "")).replaceAll(" ", "")),
    (isNaN(e) || " " == e) && (e = "0"),
    e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

const Fish = () => {
  const [data, setData] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [updateId, setUpdateId] = useState();
  const [deleteToko, setDeleteToko] = useState();
  const [dataById, setDataById] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios({
        url: api.fish.get,
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenEdit = (id) => {
    console.log("ID =", id);
    setUpdateId(id);
    // fetchDataByid(id);
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Warning !",
      text: "Are you sure want to delete ?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Ok",
      allowOutsideClick: !1,
      allowEscapeKey: !1,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(api.fish.delete + id);
          console.log("STATUS DEL =", data);
          if (data.status == "success") {
            Swal.fire({
              title: "Success",
              text: "Fish has been deleted",
              icon: "success",
              showCancelButton: !1,
              confirmButtonColor: "#e61010",
              confirmButtonText: "Ok",
              allowOutsideClick: !1,
              allowEscapeKey: !1,
            }).then((result) => {
              if (result.isConfirmed) {
                fetchData();
              }
            });
          } else {
            Swal.fire(data.status, data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      } else {
        Swal.fire("Info", "Cancelled", "info");
      }
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        index = index + 1;
        return (
          <>
            <span key={index}>{(page - 1) * 10 + index}</span>
          </>
        );
      },
    },
    {
      title: "Nama Ikan",
      dataIndex: "fish_name",
      key: "fish_name",
    },
    {
      title: "Tipe Ikan",
      dataIndex: "fish_type",
      key: "fish_type",
    },
    {
      title: "Ukuran Ikan",
      dataIndex: "fish_size",
      key: "fish_size",
      render: (text, record, i) => <span key={i}>{record.fish_size} cm</span>,
    },
    {
      title: "Harga Ikan",
      dataIndex: "fish_price",
      key: "fish_price",
      render: (text, record, i) => <span key={i}>Rp. {currencyComma(record.fish_price)}</span>,
    },
    {
      title: "Deskripsi Ikan",
      dataIndex: "fish_description",
      key: "fish_description",
      width: 500,
    },
    {
      title: "Gambar",
      key: "image_path",
      dataIndex: "image_path",
      render: (text, record, i) => (
        <img
          key={i}
          src={`http://localhost:9050${record.image_path}`}
          alt={record.image_path}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,
      render: (text, record, index) => {
        return (
          <>
            <Row key={index}>
              <Button color="warning" onClick={() => handleOpenEdit(record.id)} type="submit" size="sm">
                Edit
              </Button>

              <Button color="danger" onClick={() => handleDelete(record.id)} type="submit" size="sm">
                Delete
              </Button>
            </Row>
          </>
        );
      },
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
                    <h3 className="mb-0">Daftar Ikan</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="info" href="#pablo" onClick={() => setOpenCreate(true)} size="md">
                      Tambah Baru
                    </Button>
                  </div>

                  <ModalFishCreate
                    title={"Tambah Ikan"}
                    open={openCreate}
                    onCancel={() => setOpenCreate(false)}
                    // fetchData={fetchData}
                  />
                  <ModalFishUpdate
                    title={"Update Ikan"}
                    open={openEdit}
                    onCancel={() => setOpenEdit(false)}
                    updateId={updateId}
                    // fetchData={fetchData}
                  />
                </Row>
              </CardHeader>
              <Table
                className="thead-light test-sm p-2"
                columns={columns}
                dataSource={data}
                rowKey={"id"}
                locale={{ emptyText: "No Data Found" }}
                scroll={{ x: "max-content" }}
                pagination={{ onChange: (e) => setPage(e) }}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Fish;
