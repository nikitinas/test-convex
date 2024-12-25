import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    ...authTables,
    tasks: defineTable({
        isCompleted: v.boolean(),
        text: v.string(),
        userId: v.optional(v.id("users"))
    }).index("by_user_id", ["userId"]),
});