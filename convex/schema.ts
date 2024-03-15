import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  gifts: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    for: v.string(),
    price: v.string(),
    url: v.optional(v.string()),
    orgId: v.string(),
  }).index('by_orgId', ['orgId']),
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
});
