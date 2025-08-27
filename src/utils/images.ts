// URLs das imagens para evitar conversão automática para base64
// Usando a pasta public para assets estáticos (recomendado pelo Vite)

export const images = {
  logotipoRestaurante: '/assets/logotipo-website-sabores-da-romeira-1.svg',
  imgMotorcycle: '/assets/IMG_0894.JPG',
  imgRestaurant: '/assets/IMG_8070.JPG',
};

// Função helper para obter a URL da imagem
export const getImageUrl = (imageName: keyof typeof images): string => {
  return images[imageName];
};
