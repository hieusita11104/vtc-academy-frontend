import { contacts as initialData } from "./data";
import { createThumbnail } from "./utils/imageUtils";

const compressImage = async (imageBase64) => {
  if (!imageBase64 || !imageBase64.startsWith("data:image/")) {
    return imageBase64;
  }

  try {
    const img = new Image();
    img.src = imageBase64;

    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let newWidth = img.width;
        let newHeight = img.height;

        const MAX_SIZE = 1000;
        if (newWidth > MAX_SIZE || newHeight > MAX_SIZE) {
          if (newWidth > newHeight) {
            newHeight = (newHeight * MAX_SIZE) / newWidth;
            newWidth = MAX_SIZE;
          } else {
            newWidth = (newWidth * MAX_SIZE) / newHeight;
            newHeight = MAX_SIZE;
          }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, newWidth, newHeight);

        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        resolve(compressed);
      };

      img.onerror = () => {
        console.error("Failed to load image for compression");
        resolve(imageBase64);
      };
    });
  } catch (err) {
    console.error("Error compressing image:", err);
    return imageBase64;
  }
};

const getPatients = async () => {
  const storedPatients = localStorage.getItem("patients");
  if (storedPatients) {
    const parsedPatients = JSON.parse(storedPatients);
    return parsedPatients.map((patient) => ({
      ...patient,
      id: Number(patient.id),
    }));
  }

  const initializedData = await Promise.all(
    initialData.map(async (patient) => {
      let avatar = patient.avatar || "";
      let thumbnail = patient.thumbnail || "";
      if (avatar && avatar.startsWith("data:image/")) {
        avatar = await compressImage(avatar);
        thumbnail = await createThumbnail(avatar);
      }
      return { ...patient, id: Number(patient.id), avatar, thumbnail };
    })
  );

  localStorage.setItem("patients", JSON.stringify(initializedData));
  return initializedData;
};

const savePatients = (patients) => {
  localStorage.setItem("patients", JSON.stringify(patients));
};

const DataService = {
  fetchAll: async () => {
    const patients = await getPatients();
    return new Promise((resolve) => {
      setTimeout(() => resolve([...patients]), 300);
    });
  },

  addNew: async (patient) => {
    const patients = await getPatients();

    let newAvatar = patient.avatar || "";
    let newThumbnail = patient.thumbnail || "";
    if (newAvatar && newAvatar.startsWith("data:image/")) {
      newAvatar = await compressImage(newAvatar);
      newThumbnail = await createThumbnail(newAvatar);
    }

    const newPatient = {
      id: patients.length ? Math.max(...patients.map(p => Number(p.id))) + 1 : 1,
      name: patient.name || "Unknown",
      email: patient.email || "",
      age: patient.age || 0,
      condition: patient.condition || "Unknown",
      status: patient.status || "Active",
      avatar: newAvatar,
      thumbnail: newThumbnail,
      fileName: patient.fileName || "",
    };

    const updatedPatients = [...patients, newPatient];
    savePatients(updatedPatients);

    setTimeout(() => {
      window.dispatchEvent(new Event("dataUpdated"));
    }, 100);

    return newPatient;
  },

  modify: async (patientId, updatedData) => {
    const patients = await getPatients();

    let updatedAvatar = updatedData.avatar || "";
    let updatedThumbnail = updatedData.thumbnail || "";
    if (updatedAvatar && updatedAvatar.startsWith("data:image/")) {
      updatedAvatar = await compressImage(updatedAvatar);
      updatedThumbnail = await createThumbnail(updatedAvatar);
    }

    const updatedPatient = {
      ...updatedData,
      id: Number(patientId),
      age: updatedData.age || 0,
      condition: updatedData.condition || "Unknown",
      avatar: updatedAvatar,
      thumbnail: updatedThumbnail,
    };

    const updatedPatients = patients.map((item) =>
      item.id === Number(patientId) ? updatedPatient : item
    );
    savePatients(updatedPatients);

    setTimeout(() => {
      window.dispatchEvent(new Event("dataUpdated"));
    }, 100);

    return updatedPatient;
  },

  remove: async (patientId) => {
    const patients = await getPatients();
    const updatedPatients = patients.filter((item) => item.id !== Number(patientId));
    savePatients(updatedPatients);

    setTimeout(() => {
      window.dispatchEvent(new Event("dataUpdated"));
    }, 100);

    return updatedPatients;
  },

  getDataCount: async () => {
    const patients = await getPatients();
    return patients.length;
  },
};

export default DataService;