import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection, query = null) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore.collection(collection)
  .orderBy('createdAt', 'desc')
  ;

  if (query) {
  }

  const unSub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      // update value

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could Not Fetch the Data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unSub());
  });

  return { error, documents };
};

export default getCollection;
