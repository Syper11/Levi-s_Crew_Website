import { Paper } from '@mui/material';

function SliderItems({item}) {
  return (
    <Paper style={{ textAlign: "center", backgroundColor: "#5CB1CC"}}>
      <img
        src={item.image}
        alt={item.title}
        style={{
          maxWidth: "70%",
          maxHeight: "45vh",
          height: "45vh",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          marginTop: "20px"
        }}
        
      />
      <div
        className="description"
        style={{
          display: "flex",
          justifyContent: "center",
          objectFit: "contain",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h2>{item.title}</h2>
      </div>
    </Paper>
  );
}

export default SliderItems;