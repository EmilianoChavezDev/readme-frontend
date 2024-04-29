module.exports = {
  // Nombre del plugin
  name: 'netlify-custom-headers',

  // Hook para modificar los headers de Netlify
  onPreBuild: async ({ utils }) => {
    // Obtener ruta del archivo _headers
    const headersFilePath = './public/_headers';

    // Contenido del archivo _headers
    const headersContent = `
/*
  X-XSS-Protection: "1; mode=block"
  Content-Security-Policy: "frame-ancestors 'none'"
  X-Frame-Options: "DENY"
  X-Content-Type-Options: "nosniff"
  Referrer-Policy: "strict-origin-when-cross-origin"
  Permissions-Policy: "accelerometer=(), camera=(), geolocation=()"
`;

    // Escribir contenido en el archivo _headers
    await utils.fs.writeFile(headersFilePath, headersContent);
  },
};
