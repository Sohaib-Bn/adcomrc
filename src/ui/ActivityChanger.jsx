import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";

import { MARKETSOPTIONS } from "../data/centers";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useAppContext } from "../context/AppContext";
import { PiArrowSquareInFill } from "react-icons/pi";
import { NestedMenuItem } from "mui-nested-menu";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const menuStyle = {
  style: {
    padding: "0",
    minWidth: "150px",
    transform: "translate(-5px,10px)",
    borderRadius: "3px",
    boxShadow: "0px 2px 6px 6px rgb(0 0 0 / 0.04)",
    backgroundColor: "#f9fafb",
    fontSize: "1.2rem",
  },
};

export default function ActivityChanger() {
  const { market, activity, setActivity } = useAppContext();
  const ref = useRef(null);

  const buttonStyle = {
    // minWidth: "195px",
    padding: "0.7rem 1.6rem 0.7rem 2rem",
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
    cursor: !activity ? "not-allowed" : "pointer",
    pointerEvents: !activity ? "none" : "auto",

    "&:hover": { backgroundColor: "#eae8e8" },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickEvent(e, activity) {
    handleClose();
    if (!activity) return;

    setActivity(activity);
    localStorage.setItem("activity", activity);
  }

  useEffect(() => {
    ref.current.querySelector("button").classList.remove("MuiButtonBase-root");
  }, []);

  return (
    <div
      ref={ref}
      className={`relative z-100 ${activity ? "" : "cursor-not-allowed"}`}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={buttonStyle}
      >
        {
          <>
            {!activity && (
              <>
                <span>No activity yet ...</span>
                <span className="text-xl">
                  <RiArrowDropDownLine />
                </span>
              </>
            )}
            {activity && (
              <>
                <span className="uppercase">{activity}</span>
                <span className="text-xl">
                  <RiArrowDropDownLine />
                </span>
              </>
            )}
          </>
        }
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
        PaperProps={menuStyle}
      >
        {MARKETSOPTIONS[market].activities.map((act) => {
          if (act.brands) {
            return (
              <NestedMenu
                act={act}
                anchorEl={anchorEl}
                handleClickEvent={handleClickEvent}
                key={act.activity}
                activity={activity}
              >
                <div className="flex flex-col gap-1 text-[1.2rem]">
                  {act.brands.map((brand) => {
                    return (
                      <MenuItem
                        disabled={activity === brand}
                        style={{
                          fontSize: "inherit",
                          fontFamily: "inherit",
                          paddingRight: "16px",
                          paddingLeft: "16px",
                          gap: "0.5rem",
                        }}
                        onClick={(e) => handleClickEvent(e, brand)}
                        key={brand}
                      >
                        <span>
                          <PiArrowSquareInFill />
                        </span>
                        <span className="uppercase">{brand}</span>
                      </MenuItem>
                    );
                  })}
                </div>
              </NestedMenu>
            );
          }
          return (
            <MenuItem
              disabled={activity === act.activity}
              style={{
                fontSize: "inherit",
                fontFamily: "inherit",
                paddingRight: "16px",
                paddingLeft: "16px",
                gap: "1rem",
              }}
              onClick={(e) => handleClickEvent(e, act.activity)}
              key={act.activity}
            >
              <span className="uppercase">{act.activity}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

function NestedMenu({ children, act, anchorEl, handleClickEvent, activity }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.querySelectorAll("li p").forEach((p) => {
      p.classList = "";
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`${activity === act.activity ? "bg-colorGreyLight" : ""}`}
    >
      <NestedMenuItem
        label={act.activity.toUpperCase()}
        rightIcon={<MdOutlineKeyboardArrowRight />}
        parentMenuOpen={anchorEl}
        sx={{
          fontSize: "inherit",
          fontFamily: "inherit",
          paddingRight: "16px",
          paddingLeft: "16px",
          gap: "0.5rem",
        }}
        onClick={(e) => handleClickEvent(e, act.activity)}
      >
        {children}
      </NestedMenuItem>
    </div>
  );
}
