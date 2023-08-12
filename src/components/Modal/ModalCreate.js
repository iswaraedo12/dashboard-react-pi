import React, { useState } from "react";
import { Modal, Table, message, Upload } from "antd";
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

const ModalCreate = ({ title, open, onCancel, fetchData }) => {
  const [seller_name, setSellerName] = useState("");
  const [seller_address, setSellerAddress] = useState("");
  const [seller_phone, setSellerPhone] = useState("");
  const [seller_description, setSellerDescription] = useState("");
  const [image_path, setImagePath] = useState("");
  const [uploadList, setUploadList] = useState(true);

  const props = {
    name: "image_path",
    multiple: false,
    onChange(info) {
      console.log("Info =", info);
      if (info.file.status == "done") {
        setImagePath(info.file.originFileObj);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (info.file.status == "error") {
        message.error(`${info.file} file upload failed.`);
      }
    },
    onDrop(e) {
      setImagePath(e.dataTransfer.files[0]);
    },
    onsubmit(e) {
      console.log("Success =", e);
    },
  };

  const uploadHandler = async (e) => {
    e.preventDefault();

    // console.log("DATA UPLOAD = ", dataUpload);
    // console.log("UPLOAD = ", uploadData);
    try {
      let dataUpload = new FormData();
      dataUpload.append("seller_name", seller_name);
      dataUpload.append("seller_address", seller_address);
      dataUpload.append("seller_phone", seller_phone);
      dataUpload.append("seller_description", seller_description);
      dataUpload.append("image_path", image_path);

      const { data } = await axios.post(api.seller.create, dataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.status == "success") {
        Swal.fire({
          title: "Tambah Toko Success !",
          icon: "success",
          allowEscapeKey: !1,
          allowOutsideClick: !1,
          showConfirmButton: !0,
        }).then((a) => {
          if (a.isConfirmed) {
            setSellerName("");
            setSellerAddress("");
            setSellerPhone("");
            setSellerDescription("");
            setImagePath("");
            setUploadList(false);
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
      Swal.fire("Error", "Tolong Upload Gambar !", "error");
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
        <Form role="form" className="p-3" onSubmit={uploadHandler}>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Nama Toko
            </label>
            <Input
              className="form-control-alternative"
              id="seller_name"
              placeholder="Nama Toko"
              type="text"
              name="seller_name"
              value={seller_name}
              onChange={(e) => setSellerName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
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
              Deskripsi Toko
            </label>
            <Input
              className="form-control-alternative"
              id="seller_description"
              placeholder="Deskripsi Toko"
              rows="4"
              type="textarea"
              name="seller_description"
              value={seller_description}
              onChange={(e) => setSellerDescription(e.target.value)}
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
          </FormGroup>
          <Button color="success" type="submit" style={{ width: "100%" }} size="md">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreate;
