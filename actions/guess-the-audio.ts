"use server";
import createSupabaseServerClient from "@/lib/supabase";

export async function getGame(id: number) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("guess_the_audio")
      .select("*")
      .eq("id", id);
    if (error) {
      return { status: 400, data: [error] };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export async function upChart(hint: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("increase_columns_by_id", {
      input_id: 1,
      column_to_increase: hint,
    });
    if (error) {
      return { status: 400, data: [error] };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export async function getChart() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("chart")
      .select("*")
      .eq("game_name", "guess_the_audio");
    if (error) {
      return { status: 400, data: [error] };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}
