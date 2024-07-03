import supabase from "./supabase";

export async function getCenters() {
  let { data, error } = await supabase
    .from("centers")
    .select("id,name,url")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateCenters({ id, url }) {
  console.log(id, url);
  const { data, error } = await supabase
    .from("centers")
    .update({ url })
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Centers could not be updated");
  }
  return data;
}
