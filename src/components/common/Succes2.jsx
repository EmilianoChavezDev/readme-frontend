import { FcOk } from 'react-icons/fc';

export const Success2 = ({ children }) => {
  return (
    <div style={{
      position: "fixed",
      top: "1rem",
      right: "1rem", 
      backgroundColor: "#00CC99",
      padding: "1rem",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "0.5rem",
      display: "flex", 
      alignItems: "center",
      zIndex: 999 // pone encima de otros elementos
    }}>
      <FcOk style={{ marginRight: "0.5rem" }} /> {/* Icono a la izquierda */}
      <div style={{ flex: 1 }}>{children}</div> {/* Contenido (texto) */}
    </div>
  );
};
