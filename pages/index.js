import Link from "next/link";
import React, { useState } from "react";
import { TbPlus, TbLayoutList } from "react-icons/tb";
import Searchbox from "../component/searchbox";

function Index() {
  const [data, setData] = useState([]);

  const searchdata = (find) => {
    if (find.length > 2) {
      let url = "/api/search";

      let options = {
        method: "POST",
        headers: {
          Accept: "*/*",

          "Content-Type": "application/json",
        },
        body: JSON.stringify({ find }),
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        })
        .catch((err) => console.error("error:" + err));
    }
  };

  console.log(data);
  return (
    <div className="container">
      <br />
      <input
        type="text"
        className="inp"
        placeholder="SEARCH..."
        onChange={(e) => {
          searchdata(e.target.value);
        }}
      />
      <br />
      <br />
      {data.error ? (
        <p>{data.error}</p>
      ) : (
        data.map((d) => {
          return (
            <Searchbox
              className="animate__animated animate__bounce"
              name={d.name}
              vilage={d.vilage}
              pageno={d.pageno}
              key={d._id}
              id={d._id}
            />
          );
        })
      )}
      <Link href={"/show"} className="roundbtnred">
        <TbLayoutList />
      </Link>
      <Link href={"/add"} className="roundbtn">
        <TbPlus />
      </Link>
    </div>
  );
}

export default Index;
