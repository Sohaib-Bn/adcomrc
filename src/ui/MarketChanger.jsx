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

  const ref = React.useRef(null);

  const { market, setMarket, setActivity } = useAppContext();

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
    if (mrkt === "worldwide") return;
    setActivity(MARKETSOPTIONS[mrkt]?.activities[0]?.activity);
    localStorage.setItem(
      "activity",
      MARKETSOPTIONS[mrkt]?.activities[0]?.activity
    );
    // setActivity(
    //   MARKETSOPTIONS[mrkt]?.activities[0]?.brands?.[0] ||
    //     MARKETSOPTIONS[mrkt]?.activities[0]?.activity
    // );
    // localStorage.setItem(
    //   "activity",
    //   MARKETSOPTIONS[mrkt]?.activities[0]?.brands?.[0] ||
    //     MARKETSOPTIONS[mrkt]?.activities[0]?.activity
    // );
  }

  React.useEffect(() => {
    ref.current.querySelector("button").classList.remove("MuiButtonBase-root");
  }, []);

  return (
    <div ref={ref} className="relative z-100 col-start-2 justify-self-end">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={buttonStyle}
      >
        {!MARKETSOPTIONS[market].marketCode && (
          <>
            <span className="text-2xl">🌍</span>
            <span>{capitalize(MARKETSOPTIONS[market]?.name)}</span>
            <span className="text-xl">
              <RiArrowDropDownLine />
            </span>
          </>
        )}
        {MARKETSOPTIONS[market].marketCode && (
          <>
            <span className={`fi fi-${MARKETSOPTIONS[market]?.marketCode}`} />
            <span>{capitalize(MARKETSOPTIONS[market]?.name)}</span>
            <span className="text-xl">
              <RiArrowDropDownLine />
            </span>
          </>
        )}
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
        {Object.keys(MARKETSOPTIONS).map((mrkt) => {
          if (!MARKETSOPTIONS[mrkt].marketCode) {
            return (
              <MenuItem
                disabled={market === mrkt}
                style={{
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  paddingLeft: "0.6rem",
                }}
                onClick={(e) => handleClickEvent(e, mrkt)}
                key={mrkt}
              >
                <span className="text-2xl">🌍</span>
                <span>{MARKETSOPTIONS[mrkt]?.name}</span>
              </MenuItem>
            );
          }
          return (
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
          );
        })}
      </Menu>
    </div>
  );
}
