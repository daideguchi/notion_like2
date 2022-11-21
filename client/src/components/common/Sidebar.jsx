import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";
// import {
//   DndContext,
//   DragOverlay,
//   closestCorners,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   UniqueIdentifier,
//   DragStartEvent,
//   DragOverEvent,
//   DragEndEvent,
// } from "@dnd-kit/core";


const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        console.log(res);
        dispatch(setMemo(res));

      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  const memoTop =  () => {
    navigate("/memo")
  }

  const canvas = () => {
    navigate("/canvas")
  }

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: 250,
        height: "100vh",
      }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>{user.username}</Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>

        {/* 余白 */}
        <Box sx={{ pt: "10px" }}></Box>
        {/* 余白 */}

        <ListItemButton onClick={canvas}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>canvas</Typography>
          </Box>
        </ListItemButton>

        {/* 余白 */}
        <Box sx={{ pt: "10px" }}></Box>
        {/* 余白 */}

        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pl:"10px"
            }}
          >
            <Typography onClick={()=> memoTop()}>メモの追加</Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>

        {/* 余白 */}
        <Box sx={{ pt: "10px",pl:"20px" }}></Box>
        {/* 余白 */}

        {memos.map((item, index) => (
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}

        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={`list-memo-droppable`}
            droppableId={`list-memo-droppable`}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {memos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeItem}
                        component={Link}
                        to={`/memo/${item.id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer!important",
                        }}
                        // onClick={() => console.log(item.id)}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
