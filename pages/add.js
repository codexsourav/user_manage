import React, { useState } from "react";
import Navbar from "../component/navbar";
import styles from "../styles/css/add.module.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
function Add() {
  const [name, setname] = useState("");
  const [vilage, setvilage] = useState("");
  const [pageno, setpageno] = useState("");
  const [pic, setpic] = useState(null);
  const [error, seterror] = useState("");
  const [process, setprocess] = useState(0);

  const addata = () => {
    seterror("");
    if (name.length < 2) {
      seterror("Enter Valid Name");
      return false;
    }
    if (vilage.length < 3) {
      seterror("Enter Vilage Name");
      return false;
    }
    if (pageno == "") {
      seterror("Enter page number");
      return false;
    }
    if (pic == null) {
      seterror("Add A Iamge");
      return false;
    }

    // upload image extension chack

    var gext = /^.+\.([^.]+)$/.exec(pic.name);
    const ext = null ? "" : gext[1].toLowerCase();
    console.log(ext);
    const valext = ["jpg", "png", "jpeg", "webp", "gif"];

    if (!valext.includes(ext)) {
      seterror("Invalid File Type");
      return false;
    }
    setprocess(1);
    // uplaod process,p
    const imgref = ref(storage, `images/${Date.now() + pic.name}`);
    const uploadTask = uploadBytesResumable(imgref, pic);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprocess(prog);
      },
      (err) => {
        console.log(err);
        seterror(err);
        setprocess(0);
        return false;
      },

      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((purl) => {
          // whene get url then ad data to database ::::::::
          // ==============================================

          let url = "/api/new";

          let options = {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, vilage, pageno, pic: purl }),
          };

          fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
              setprocess(0);
              if (json.status == true) {
                Swal.fire("Data Added", "", "success");
              } else {
                alert(json.error);
              }
            })
            .catch((err) => console.error("error:" + err));

          // ==============================================
          // :::::::::::::: ADD TO DATABASE :::::::::::::::
        })
    );
  };

  return (
    <>
      <Navbar title="sourav" />
      <div className="container">
        <div className={styles.addbox}>
          <h1>Add New Data</h1>
          <p className="erred">{error}</p>
          <label>Name </label>
          <input
            type="text"
            className="inp"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <br />
          <label>Vilage Name </label>
          <input
            type="text"
            className="inp"
            value={vilage}
            onChange={(e) => {
              setvilage(e.target.value);
            }}
          />
          <br />
          <label>Page No </label>
          <input
            type="number"
            className="inp"
            value={pageno}
            onChange={(e) => {
              setpageno(e.target.value);
            }}
          />
          <br />
          <label>Image Proof </label>
          <input
            type="file"
            className="inp"
            onChange={(e) => {
              setpic(e.target.files[0]);
            }}
          />
          <br />
          <br />
          <br />
          <br />
          <input
            type="submit"
            disabled={process != 0 ? true : false}
            value={process != 0 ? "Uplaoding " + process + "%" : "ADD DATA"}
            className={process != 0 ? "disbtn" : "btn"}
            onClick={() => {
              addata();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Add;
