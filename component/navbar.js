import React from "react";
import { TbChevronLeft } from "react-icons/tb";
import styles from "../styles/css/navbar.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
function Navbar(props) {
  const { pathname } = useRouter();

  return (
    <>
      {pathname != "/" ? (
        <div className={styles.navbar}>
          <div className={styles.back} onClick={() => Router.back()}>
            <TbChevronLeft />
          </div>

          <div className={styles.title}>{props.title}</div>
          <div></div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
