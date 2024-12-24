import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async ({ db }) => {
        return await db.query("tasks").collect();
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
        userName: v.string(),
        text: v.string(),
    },
    handler: async ({ db }, { userName, text }) => {
        let userId = (await db.query("users").withIndex("by_name", (q) => q.eq("name", userName)).unique())?._id;
        if (!userId) {
            userId = await db.insert("users", { name: userName });
        }
        await db.insert("tasks", { userId, text, isCompleted: false });
    },
});