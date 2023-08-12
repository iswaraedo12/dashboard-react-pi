import React, { useEffect, useState } from "react";
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

const ModalFishUpdate = ({ title, open, onCancel, updateId }) => {
  const [fish_name, setFishName] = useState();
  const [fish_description, setFishDescription] = useState();
  const [fish_type, setFishType] = useState();
  const [fish_size, setFishSize] = useState();
  const [fish_price, setFishPrice] = useState();
  const [image_path, setImagePath] = useState();
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

  const editHandler = async (e) => {
    e.preventDefault();

    // console.log("DATA UPLOAD = ", dataUpload);
    // console.log("UPLOAD = ", uploadData);
    try {
      let dataUpload = new FormData();
      dataUpload.append("fish_name", fish_name);
      dataUpload.append("fish_type", fish_type);
      dataUpload.append("fish_size", fish_size);
      dataUpload.append("fish_price", fish_price);
      dataUpload.append("fish_description", fish_description);
      dataUpload.append("image_path", image_path);

      const { data } = await axios.post(api.fish.update + updateId, dataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.status == "success") {
        Swal.fire({
          title: "Edit Toko Success !",
          icon: "success",
          allowEscapeKey: !1,
          allowOutsideClick: !1,
          showConfirmButton: !0,
        }).then((a) => {
          if (a.isConfirmed) {
            setFishName("");
            setFishType("");
            setFishSize("");
            setFishPrice("");
            setFishDescription("");
            setImagePath("");

            setUploadList(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
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

  useEffect(() => {
    if (updateId !== undefined && updateId !== null && updateId !== "") {
      axios
        .get(api.fish.getById + updateId)
        .then((data) => {
          let tempData = [];
          tempData.push(data.data.data);
          setFishName(tempData[0].fish_name);
          setFishType(tempData[0].fish_type);
          setFishSize(tempData[0].fish_size);
          setFishPrice(tempData[0].fish_price);
          setFishDescription(tempData[0].fish_description);
        })
        .catch((err) => {
          Swal.fire("error", err.message, "error");
        });
    }
  }, [updateId]);

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
        <Form role="form" className="p-3" onSubmit={editHandler}>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Nama Ikan
            </label>
            <Input
              className="form-control-alternative"
              id="fish_name"
              placeholder="Nama Ikan"
              type="text"
              name="fish_name"
              value={fish_name}
              onChange={(e) => setFishName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Tipe Ikan
            </label>
            <Input
              className="form-control-alternative"
              id="fish_type"
              placeholder="Tipe Ikan"
              type="text"
              name="fish_type"
              value={fish_type}
              onChange={(e) => setFishType(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Ukuran Ikan
            </label>
            <Input
              className="form-control-alternative"
              id="fish_size"
              placeholder="Ukuran Ikan"
              type="text"
              name="fish_size"
              value={fish_size}
              onChange={(e) => setFishSize(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Harga Ikan
            </label>
            <Input
              className="form-control-alternative"
              id="fish_price"
              placeholder="Harga Ikan"
              type="text"
              name="fish_price"
              value={fish_price}
              onChange={(e) => setFishPrice(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted" htmlFor="input-username">
              Deskripsi Ikan
            </label>
            <Input
              className="form-control-alternative"
              id="fish_description"
              placeholder="Deskripsi Ikan"
              rows="4"
              type="textarea"
              name="fish_description"
              value={fish_description}
              onChange={(e) => setFishDescription(e.target.value)}
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

export default ModalFishUpdate;
