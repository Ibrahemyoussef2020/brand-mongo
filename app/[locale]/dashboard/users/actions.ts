'use server';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import { revalidatePath } from "next/cache";

export async function setUserRole(userId: string, role: string) {
    try {
        await dbConnect();
        await UserModel.findByIdAndUpdate(userId, { role });
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error: "Failed to update role" };
    }
}

export async function toggleUserRole(userId: string, roleType: 'isCashier' | 'isSeller' | 'isAdmin', currentValue: boolean) {
    try {
        await dbConnect();
        
        // Map boolean toggle to actual role string
        let newRole = 'user';
        if (!currentValue) {
            if (roleType === 'isSeller') newRole = 'seller';
            if (roleType === 'isAdmin') newRole = 'admin';
        }
        
        await UserModel.findByIdAndUpdate(userId, { 
            role: newRole,
            [roleType]: !currentValue 
        });
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true };
    } catch (error) {
        console.error("Error toggling user role:", error);
        return { success: false, error: "Failed to update role" };
    }
}

export async function deleteUser(userId: string) {
    try {
        await dbConnect();
        await UserModel.findByIdAndDelete(userId);
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
