import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";

import { MARKETSOPTIONS } from "../data/centers";
import { capitalize } from "../utils/helpers";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useAppContext } from "../context/AppContext";

export default function MarketChanger() {
  const buttonStyle = {
    padding: "0.7rem 1rem",
    color: "#444",
    backgroundColor: "#f7f7f7",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    gap: "0.5rem",
    alignItems: "center",
    display: "flex",
    textTransform: "inherit",
    fontFamily: "inherit",
    fontWeight: "meduim",
    fontSize: "1.25rem",

    "&:hover": { backgroundColor: "#eae8e8" },
  };

  const { market, setMarket } = useAppContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickEvent(e, mrkt) {
    handleClose();
    setMarket(mrkt);
    localStorage.setItem("market", mrkt);
  }

  return (
    <div className="relative z-100">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={buttonStyle}
      >
        <span className={`fi fi-${MARKETSOPTIONS[market]?.marketCode}`} />
        <span>{capitalize(MARKETSOPTIONS[market]?.name)}</span>
        <span className="text-xl">
          <RiArrowDropDownLine />
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClose(e, null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          style: {
            padding: "0",
            minWidth: "120px",
            transform: "translate(-15px,10px)",
            borderRadius: "3px",
            boxShadow: "0px 2px 6px 6px rgb(0 0 0 / 0.04)",
            backgroundColor: "#f9fafb",
            fontSize: "1.2rem",
          },
        }}
      >
        {Object.keys(MARKETSOPTIONS).map((mrkt) => (
          <MenuItem
            disabled={market === mrkt}
            style={{
              fontSize: "inherit",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            onClick={(e) => handleClickEvent(e, mrkt)}
            key={mrkt}
          >
            <span className={`fi fi-${MARKETSOPTIONS[mrkt]?.marketCode}`} />
            <span>{MARKETSOPTIONS[mrkt].name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
