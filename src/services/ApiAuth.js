import supabase from "./supabase";

export async function singupUser({ email, password, admin }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        admin: admin,
      },
    },
  });

  if (error) {
    console.error("Could not sign up. Try again");
    throw new Error(error.message);
  }

  return data;
}

export async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  // CHECK IF THERE IS AN ACTIVE SESSION
  const { data: session } = await supabase.auth.getSession();

  // IF THERE IS'T AN ACTIVE SESSION RETURN NULL
  if (!session.session) return null;

  // IF THERE IS AN ACTIVE SESSION NOW AND ONLY NOW FETCH CURRENT USER FROM SUPABASE
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function updateUser({ password }) {
  const { data: updatedUser, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return updatedUser;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
