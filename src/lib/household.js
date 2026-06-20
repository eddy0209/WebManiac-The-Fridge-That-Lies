import { supabase } from "./supabase";

export async function ensureHousehold(user) {

    const { data: membership } = await supabase
        .from("household_members")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (membership) {
        return membership.household_id;
    }

    const { data: household, error } = await supabase
        .from("households")
        .insert({
            name: `${user.user_metadata.full_name}'s Household`
        })
        .select()
        .single();

    if (error) throw error;

    await supabase
        .from("household_members")
        .insert({
            household_id: household.id,
            user_id: user.id,
            role: "admin"
        });

    return household.id;
}