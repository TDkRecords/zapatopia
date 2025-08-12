import { auth, db } from "$lib/assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/**
 * Escucha el estado de autenticación y devuelve datos del usuario
 * @param {Function} callback - Recibe (userData, loading, error)
 */
export function obtenerUsuario(callback) {
  let unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          callback(snap.data(), false, null); // userData, loading, error
        } else {
          callback(null, false, "No se encontraron datos del usuario.");
        }
      } catch (error) {
        callback(null, false, error.message);
      }
    } else {
      callback(null, false, "No autenticado");
    }
  });

  return unsubscribe; // para detener la suscripción si se desea
}
