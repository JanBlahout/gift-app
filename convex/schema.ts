import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  gifts: defineTable({ name: v.string() }),
});
