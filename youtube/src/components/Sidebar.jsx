import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllVideoType } from "../services/video.service";
import { getLocalStorage, setLocalStorage } from "../utils";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [listCategories, setListCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const resp = await getAllVideoType();
     await setListCategories(resp);
    })();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {listCategories.map((category) => (
        <button
          className="category-btn"
          onClick={() =>{navigate(`/listVideoType/${category.type_id}`);
          setLocalStorage("current_category",category.type_name);
          let categoryName=getLocalStorage("current_category");
          setSelectedCategory(categoryName);
        } 
        }
          style={{
            background: category.type_name === getLocalStorage("current_category") ? "#FC1503" : "",
            color: "white",
          }}
          key={category.type_id}
        >
          <span
            style={{
              color: category.type_name === getLocalStorage("current_category") ? "white" : "red",
              marginRight: "15px",
            }}
          >
            <i className={category.class_css} />
          </span>
          <span
            style={{
              opacity: category.type_name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.type_name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Categories;
