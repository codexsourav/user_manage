import Link from "next/link";
import React from "react";
import styles from "../styles/css/searchbox.module.css";
import { TbEye } from "react-icons/tb";

function Searchbox(props) {
  return (
    <div className={styles.searchbox}>
      <div className={styles.info}>
        <h1>{props.name}</h1>
        <p>
          {props.vilage} | Page No : {props.pageno}
        </p>
      </div>
      <Link href={"/view/" + props.id}>
        <TbEye />
      </Link>
    </div>
  );
}

export default Searchbox;
