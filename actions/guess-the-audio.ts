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

export async function addGame(newdata: any) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("guess_the_audio")
      .insert([newdata])
      .select();
    if (error) {
      return { status: 400, data: [error] };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export async function getGames(pageNumber: number, pageSize: number) {
  try {
    // Tính chỉ số bắt đầu của bản ghi trong trang
    const offset = (pageNumber - 1) * pageSize;
    const supabase = await createSupabaseServerClient();
    const { data: dataList } = await supabase
      .from("guess_the_game")
      .select("id");
    const { data, error } = await supabase
      .from("guess_the_game")
      .select().order("created_at", {ascending: false})
      .range(offset, offset + pageSize - 1); // Xác định phạm vi bản ghi cần lấy
    if (error) {
      return { status: 400, data: [error] };
    } else return { status: 200, data: data, totalPage: Math.ceil(Number(dataList?.length)) };
  } catch (error) {
    console.log(error);
  }
}
