import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("User not authenticated");
        }
        return await ctx.db.query("tasks").filter(q => q.eq(q.field("userId"), userId)).collect();
    }
});

export const update = mutation({
    args: {
        id: v.id("tasks"),
        isCompleted: v.boolean(),
    },
    handler: async ({ db }, { id, isCompleted }) => {
        await db.patch(id, { isCompleted });
    },
});

export const insert = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, { text }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("User not authenticated");
        }
        await ctx.db.insert("tasks", { userId, text, isCompleted: false });
    },
});

export const deleteTask = mutation({
    args: {
        id: v.id("tasks"),
    },
    handler: async ({ db }, { id }) => {
        await db.delete(id); // Delete the task by its ID
    },
});