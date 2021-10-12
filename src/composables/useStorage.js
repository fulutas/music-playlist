import { projectStorage } from "../firebase/config";
import { ref } from "vue";
import getUser from "./getUser"

// Mevcut kullanıcı bilgisi
const { user } = getUser()


const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  // Storage dosya yükler
  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value) // Klasör oluştur

    try {
        // Klasör içerisine dosyayı ekler
        const res = await storageRef.put(file)
        url.value = await res.ref.getDownloadURL()

    } catch(err){
        console.log(err.message)
        error.value = err.message;
    }
  }

  // Storage den dosya siler
  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path) 

    try {
      await storageRef.delete()
    } catch (error) {
      console.log(error.message)
      error.value = error.message
    }

  }

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
