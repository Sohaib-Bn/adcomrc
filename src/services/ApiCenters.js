import supabase from "./supabase";

export async function getCenters(jobTitle, market, activity) {
  let activityFormated;
  let schema = `${market}-${activityFormated}`;

  if (activity) {
    activityFormated = activity?.replace(" ", "-");
  }
  if (market === "worldwide") schema = "public";

  let { data, error } = await supabase
    .from(`centers-${jobTitle}`)
    .select("id,name,url,type,subTo")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateCenters({ id, url, jobTitle }) {
  const { data, error } = await supabase
    .from(`centers-${jobTitle}`)
    .update({ url })
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Centers could not be updated");
  }

  return data;
}
