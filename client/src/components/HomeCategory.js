import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { spacing } from "@mui/system";
import { CardActionArea } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomeCategory(currElem) {
  const navigate = useNavigate();

  const { name, slug, _id } = currElem;
  return (
    <Card raised sx={{ maxWidth: "290px", m: 0.5, textAlign: "center" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          sx={{
            maxHeight: "222px",
            minWidth: "320px",
            justify: "center",
            objectFit: "contain",
            padding: "4px",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
          image={`/api/v1/category/category-photo/${_id}`}
        />
        <CardContent sx={{ padding: "0.8rem" }}>
          <Typography
            sx={{
              minHeight: "40px",
              fontWeight: 500,
              marginBottom: "0.3rem",
              marginTop: "0.3 rem",
              color: "#282c3f",
              lineHeight: 1,
            }}
            variant="h6"
            component={"div"}
          >
            {name.substring(0, 25)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
