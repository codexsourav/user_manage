import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar";
import styles from "../../styles/css/add.module.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import Router, { useRouter } from "next/router";
function Update() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setname] = useState("");
  const [vilage, setvilage] = useState("");
  const [pageno, setpageno] = useState("");
  const [pic, setpic] = useState("");
  const [error, seterror] = useState("");
  const [process, setprocess] = useState(0);
  const [img, setimg] = useState(null);
  useEffect(() => {
    if (id) {
      let url = "/api/get/" + id;
      let options = {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          setname(json.data.name);
          setvilage(json.data.vilage);
          setpageno(json.data.pageno);
          setpic(json.data.pic);
        })
        .catch((err) => {
          console.error("error:" + err);
          Router.replace("/");
        });
    }
  }, [id]);

  // ????????
  // updte request

  const updateReq = (uname, uvilage, upageno, upic) => {
    let url = "/api/get/" + id;
    let options = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: uname,
        vilage: uvilage,
        pageno: upageno,
        pic: upic,
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setprocess(0);
        if (json.status == true) {
          Swal.fire("Data Updated", "", "success");
        } else {
          alert(json.error);
        }
      })
      .catch((err) => {
        console.error("error:" + err);
      });
  };

  // ??????????????????????????/
  const updateData = () => {
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
    // ''''''''''''''''''''''''''''''''''''
    // upload image extension chack

    if (!img) {
      updateReq(name, vilage, pageno, pic);
    } else {
      setprocess(1);
      var gext = /^.+\.([^.]+)$/.exec(img.name);
      const ext = null ? "" : gext[1].toLowerCase();
      const valext = ["jpg", "png", "jpeg", "webp", "gif"];

      if (!valext.includes(ext)) {
        seterror("Invalid File Type");
        return false;
      }

      // uplaod process,p
      const imgref = ref(storage, `images/${Date.now() + img.name}`);
      const uploadTask = uploadBytesResumable(imgref, img);

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

            updateReq(name, vilage, pageno, purl);

            // ==============================================

            // ''''''''''''''''''''''''''''''''''''
          })
      );
    }
  };

  return (
    <>
      <Navbar title={name} />
      <div className="container">
        <div className={styles.addbox}>
          <h1>Update Data</h1>
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
              setimg(e.target.files[0]);
            }}
          />
          <br />
          <br />
          <br />
          <br />

          <input
            type="submit"
            disabled={process != 0}
            value={process != 0 ? "Uplaoding " + process + "%" : "UPDATE DATA"}
            className={process != 0 ? "disbtn" : "btn"}
            onClick={() => updateData()}
          />
        </div>
      </div>
    </>
  );
}

export default Update;
