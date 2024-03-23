"use server";
import createSupabaseServerClient from "@/lib/supabase";

export async function getGame(id: number) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("guess_the_game")
        .select("*").eq("id", id)
      if (error) {
        return { status: 400, data: [error]};
      } else return { status: 200, data: data };
    } catch (error) {
      console.log(error);
    }
  }