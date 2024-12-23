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