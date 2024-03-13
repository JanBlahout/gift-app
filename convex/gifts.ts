import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createGift = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('you must be logged id to create a gift');
    }
    await ctx.db.insert('gifts', {
      name: args.name,
    });
  },
});

export const getGifts = query({
  args: {},
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return [];
    }
    return ctx.db.query('gifts').collect();
  },
});
