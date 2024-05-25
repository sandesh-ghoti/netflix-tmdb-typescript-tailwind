interface ImageConfig {
  base_url: string;
  sizes: string[];
}

const getSrcSet = (path: string, config: ImageConfig) => {
  const srcset = config.sizes
    .map((size) => {
      const url = `${config.base_url}${size}${path}`;
      return `${url} ${size.replace(/\D/g, "")}w`;
    })
    .join(", ");

  return srcset;
};

export default getSrcSet;
