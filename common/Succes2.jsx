import { FcOk } from 'react-icons/fc';

export const Success2 = ({ children }) => {
  return (
    <div style={{
      position: "fixed",
      top: "1rem",
      right: "1rem", // Cambiado a "right" en lugar de "left"
      backgroundColor: "#00CC99",
      padding: "1rem",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "0.5rem",
      display: "flex", // Añadido para alinear el icono y el texto horizontalmente
      alignItems: "center", // Añadido para centrar verticalmente el icono y el texto
    }}>
      <FcOk style={{ marginRight: "0.5rem" }} /> {/* Icono a la izquierda */}
      <div style={{ flex: 1 }}>{children}</div> {/* Contenido (texto) */}
    </div>
  );
};
