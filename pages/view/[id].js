import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/css/view.module.css";
import { TbPencil, TbEraser } from "react-icons/tb";
import Navbar from "../../component/navbar";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
function View() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [rm, setrm] = useState(false);
  const { id } = router.query;

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
          console.log(json);
          if (json.error) {
            setData(json);
          } else {
            setData(json.data);
          }
        })
        .catch((err) => {
          console.error("error:" + err);
        });
    }
  }, [id]);

  // delete data
  const deleteData = () => {
    let url = "/api/get/" + id;

    let options = {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      },
    };

    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await fetch(url, options);
          if (!response.error) {
            Swal.fire("Deleted!", "Your Data Is Deleted", "success");
            setrm(true);
          }
          return await response.json();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  if (data.error) {
    return (
      <p
        className="container"
        style={{ padding: 30, textAlign: "center", marginTop: 50 }}
      >
        {data.error}
        <br />
        <br />
        <Link href="/" className="btnlink">
          Home
        </Link>
      </p>
    );
  }

  return (
    <>
      <Navbar title={data.name} />
      {data ? (
        <div className="container">
          <div className={!rm ? styles.viewbox : styles.viewboxred}>
            <h1>{data.name}</h1>
            <div className={styles.info}>
              <p>{data.vilage}</p>
              <p>Page No : {data.pageno}</p>
            </div>
          </div>
          <br />

          <Link href={data.pic ? data.pic : "/load.gif"}>
            <Image
              src={data.pic ? data.pic : "/load.gif"}
              width={200}
              height={250}
              loading="lazy"
              alt="user"
              className="imageprf"
            />
          </Link>
          <Link href={"/update/" + id} className="roundbtn">
            <TbPencil />
          </Link>
          <p className="roundbtnred" onClick={() => deleteData()}>
            <TbEraser />
          </p>
        </div>
      ) : null}
    </>
  );
}

export default View;
