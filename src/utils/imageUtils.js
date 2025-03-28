
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const optimizeImage = async (base64) => {
  return base64;
};

export const createThumbnail = async (base64) => {
  try {
    const img = new Image();
    img.src = base64;

    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 40; 
        let newWidth = img.width;
        let newHeight = img.height;

        if (newWidth > newHeight) {
          newHeight = (newHeight * MAX_SIZE) / newWidth;
          newWidth = MAX_SIZE;
        } else {
          newWidth = (newWidth * MAX_SIZE) / newHeight;
          newHeight = MAX_SIZE;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, newWidth, newHeight);

        const thumbnail = canvas.toDataURL("image/jpeg", 0.8);
        resolve(thumbnail);
      };

      img.onerror = () => {
        console.error("Failed to load image for thumbnail creation");
        resolve(base64);
      };
    });
  } catch (err) {
    console.error("Error creating thumbnail:", err);
    return base64;
  }
};

export const validateImageFile = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    return { isValid: false, message: "You can only upload JPG/PNG file!" };
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return { isValid: false, message: "Image must be smaller than 2MB!" };
  }

  return { isValid: true };
};