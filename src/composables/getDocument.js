import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection,id) => {

  const document = ref(null)
  const error = ref(null)

  // gelen id'ye göre veri al
  let documentRef = projectFirestore.collection(collection).doc(id)

  // Dataları anlık izler
  const unsub = documentRef.onSnapshot(doc => {

    if(doc.data()){
    document.value = {...doc.data(), id : doc.id}
    error.value = null
    } else {
    error.value = 'Kayıt bulunamadı.'
    }
    
  }, err => {
    console.log(err.message)
    error.value = 'Kayıt getirelemedi.'
  })

  // Veriyi aldıktan sonra izlemeyi bırak..
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document }
}

export default getDocument