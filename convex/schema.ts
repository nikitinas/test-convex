import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
    }).index("by_name", ["name"]),
    tasks: defineTable({
        isCompleted: v.boolean(),
        text: v.string(),
        userId: v.optional(v.id("users"))
    }).index("by_user_id", ["userId"]),
});