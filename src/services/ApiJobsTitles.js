import supabase from "./supabase";

export async function getJobsTitle() {
  let { data: jobsTitle, error } = await supabase.from("jobsTitle").select("*");

  if (error) {
    console.error("Could not upload jobs title");
    throw new Error(error.message);
  }
  return jobsTitle;
}
