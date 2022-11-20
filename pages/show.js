import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import Navbar from "../component/navbar";
import Searchbox from "../component/searchbox";

function Show() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "/api";
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
        setData(json.data);
      })
      .catch((err) => console.error("error:" + err));
  }, []);
  console.log(data);
  return (
    <>
      <Navbar title="Show all data" />
      <div className="container">
        <br />
        {data.error ? (
          <p>{data.error}</p>
        ) : (
          data.map((d) => {
            return (
              <Searchbox
                name={d.name}
                vilage={d.vilage}
                pageno={d.pageno}
                key={d._id}
                id={d._id}
              />
            );
          })
        )}

        <Link href={"/add"} className="roundbtn">
          <TbPlus />
        </Link>
      </div>
    </>
  );
}

export default Show;
