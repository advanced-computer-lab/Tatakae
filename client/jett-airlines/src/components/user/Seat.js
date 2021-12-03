import React from "react";
import { Box } from "@mui/material";
import "../../css/Plane.css";
import { useEffect } from "react";

export default function Seat(props) {
  //const [refresh, setRefresh] = React.useState(false);
  //const [pressed, setPressed] = React.useState(false);
  const [pressed, setPressed] = React.useState(0);
  let seatColor = { backgroundColor: props.colors.selectedColor };
  let className = "seat";
  if (!props.available) {
    if (pressed === 0) {
      seatColor = { backgroundColor: props.colors.availableColor };
    }
  } else {
    seatColor = { backgroundColor: props.colors.occupiedColor };
    className += " occupied";
  }

  const handleClick = () => {
    if (!props.available) {
      if (pressed !== 0) {
        //props.setSelectedCount(props.selectedCount - 1);
        props.setSelected(
          props.selected.filter(function (f) {
            return f.seatIndex !== props.seatIndex;
          })
        );
        if (pressed === 1) {
          props.setTotalPrice(props.totalPrice - props.price);
          setPressed(0);
        } else if (pressed === 2) {
          props.setTotalPrice(props.totalPrice - 0.5 * props.price);
          setPressed(0);
        } else {
          if (props.isChild) {
            props.setTotalPrice(props.totalPrice - 0.5 * props.price);
          } else {
            props.setTotalPrice(props.totalPrice - props.price);
          }
        }
      } else {
        //props.setSelectedCount(props.selectedCount + 1);
        if (props.isChild) {
          setPressed(2);
          props.setSelected((prevArray) => [
            ...prevArray,
            {
              seatIndex: props.seatIndex,
              seatNumber: props.seatNumber,
              isChild: true,
              price: 0.5 * props.price,
            },
          ]);
          props.setTotalPrice(props.totalPrice + 0.5 * props.price);
        } else {
          setPressed(1);
          props.setSelected((prevArray) => [
            ...prevArray,
            {
              seatIndex: props.seatIndex,
              seatNumber: props.seatNumber,
              isChild: false,
              price: props.price,
            },
          ]);
          props.setTotalPrice(props.totalPrice + props.price);
        }
      }
    }
  };

  useEffect(() => {}, [pressed]);

  return (
    <Box onClick={handleClick} class={className} style={seatColor}>
      {props.seatNumber}
    </Box>
  );
}
