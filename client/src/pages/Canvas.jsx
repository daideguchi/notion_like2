// import { Box, color } from "@mui/system";
import Draggable from "react-draggable";

import React from "react";
// import assets from "../assets";

export const Canvas = () => {
    //   function draggable(target) {
    //     target.onmousedown = function () {
    //       document.onmousemove = mouseMove;
    //     };
    //     document.onmouseup = function () {
    //       document.onmousemove = null;
    //     };
    //     function mouseMove(e) {
    //       let event = e ? e : window.event;
    //       target.style.top = event.clientY + "px";
    //       target.style.left = event.clientX + "px";
    //     }
    //   }
    return (
      <>
        <Draggable defaultPosition={{ x: 0, y: 0 }} handle="b">
          <div style={{ position: "absolute" }}>
            <b>ここをつかんで移動</b>
            <p>ドラッグで移動したい要素</p>
          </div>
        </Draggable>

        <Draggable defaultPosition={{ x: 0, y: 0 }} cancel="p">
          <div style={{ position: "absolute" }}>
            <b>移動が可能な要素です</b>
            <p>ドラッグで移動したい要素</p>
          </div>
        </Draggable>
      </>
    );

//   Draggable(document.getElementById("a1"));
//   draggable(document.getElementById("b1"));
//   draggable(document.getElementById("c1"));
};
