import React, { useEffect, useState } from "react";
import { Modal, Table, message, Upload, Select } from "antd";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { api } from "../../config/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const ModalRelationCreate = ({ title, open, onCancel, fetchData }) => {
  const [sellerData, setSellerData] = useState([]);
  const [fishData, setFishData] = useState([]);
  const [fish_id, setFishId] = useState("");
  const [seller_id, setSellerId] = useState("");

  const fetchSellerData = async () => {
    try {
      const { data } = await axios.get(api.seller.get);
      if (data.status === "success") {
        setSellerData(data.data);
      } else {
        setSellerData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFishData = async () => {
    try {
      const { data } = await axios.get(api.fish.get);
      if (data.status === "success") {
        setFishData(data.data);
      } else {
        setFishData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSellerData();
    fetchFishData();
  }, []);

  const mapSeller = sellerData.map((e, index) => {
    return {
      key: index,
      value: e.id,
      label: e.seller_name,
    };
  });

  const mapFish = fishData.map((e, index) => {
    return {
      index: index,
      value: e.id,
      label: e.fish_name + " - " + e.fish_price,
    };
  });

  const submitRelation = async (e) => {
    e.preventDefault();

    // console.log("DATA UPLOAD = ", dataUpload);
    // console.log("UPLOAD = ", uploadData);
    try {
      const { data } = await axios.get(
        `${api.temp.get}/${seller_id}/${fish_id}`
      );

      if (data.status == "success") {
        Swal.fire({
          title: "Tambah Ikan Success !",
          icon: "success",
          allowEscapeKey: !1,
          allowOutsideClick: !1,
          showConfirmButton: !0,
        }).then((a) => {
          if (a.isConfirmed) {
            setSellerId("");
            setFishId("");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            // fetchData();
          }
        });
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.log("Error =", error);
      Swal.fire("Error", "Arwana Sudah Ada !", "error");
    }
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={open}
        // onOk={uploadHandler}
        width={"50%"}
        onCancel={onCancel}
        // okText="Create"
        footer={null}
      >
        <Form role="form" className="p-3" onSubmit={submitRelation}>
          <FormGroup>
            <label
              className="heading-small text-muted"
              htmlFor="input-username"
            >
              Nama Toko
            </label>
            <Select
              defaultValue="--- Select One ---"
              style={{
                width: "100%",
              }}
              options={mapSeller}
              onChange={(e) => setSellerId(e)}
            />
          </FormGroup>
          <FormGroup>
            <label
              className="heading-small text-muted"
              htmlFor="input-username"
            >
              Nama Ikan
            </label>
            <Select
              defaultValue="--- Select One ---"
              style={{
                width: "100%",
              }}
              options={mapFish}
              onChange={(e) => setFishId(e)}
            />
          </FormGroup>
          {/* <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Alamat Toko
            </label>
            <Input
              className="form-control-alternative"
              id="seller_address"
              placeholder="Alamat Toko"
              type="text"
              name="seller_address"
              value={seller_address}
              onChange={(e) => setSellerAddress(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Nomor Telepon Toko
            </label>
            <Input
              className="form-control-alternative"
              id="seller_phone"
              placeholder="Nomor Telepon Toko"
              type="text"
              name="seller_phone"
              value={seller_phone}
              onChange={(e) => setSellerPhone(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Upload Gambar
            </label>
            <Dragger required {...props} showUploadList={uploadList}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>Click or drag file to this area to upload</p>
            </Dragger>
          </FormGroup> */}
          <Button
            color="success"
            type="submit"
            style={{ width: "100%" }}
            size="md"
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalRelationCreate;
