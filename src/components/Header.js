// import React from "react";

// function Header() {
//   return (
//     <header className="header">
//       <p>tes</p>
//     </header>
//   );
// }

// export default Header;

import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "rgb(184, 134, 11)",
    paddingRight: "5rem",
    paddingLeft: "5rem",
    height: "8vh",
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headersData = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "About",
    href: "/about",
  },
];

const Header = (props) => {
  const { header, logo, menuButton, toolbar } = useStyles();

  function doLogout() {
    sessionStorage.clear();
    // props.history.push("/");
    props.logout();
  }

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Web Test
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: Link,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>
          {getMenuButtons()}
          <Button
            {...{
              key: "logout",
              color: "inherit",
              className: menuButton,
            }}
            onClick={() => doLogout()}
          >
            Log Out
          </Button>
        </div>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar className={header} position="static">
        {displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;
