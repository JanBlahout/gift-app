import { ConvexError, v } from 'convex/values';
import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { getUser } from './users';

// export const generateUploadUrl = mutation(async (ctx) => {
//   const identity = await ctx.auth.getUserIdentity();

//   if (!identity) {
//     throw new ConvexError('you must be logged id to create a gift');
//   }

//   return await ctx.storage.generateUploadUrl();
// });

async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  if (!hasAccess) {
    throw new ConvexError('you do not have access to this organisation');
  }

  return hasAccess;
}

export const createGift = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    for: v.string(),
    price: v.string(),
    url: v.optional(v.string()),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('you must be logged id to create a gift');
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) {
      throw new ConvexError('you do not have access to this organisation');
    }

    await ctx.db.insert('gifts', {
      name: args.name,
      description: args.description,
      for: args.for,
      price: args.price,
      url: args.url,
      orgId: args.orgId,
    });
  },
});

export const getGifts = query({
  args: { orgId: v.string() },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) {
      return [];
    }

    return ctx.db
      .query('gifts')
      .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
      .collect();
  },
});

export const deleteGift = mutation({
  args: { giftId: v.id('gifts') },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('you must be logged id to create a gift');
    }

    const gift = await ctx.db.get(args.giftId);

    if (!gift) {
      throw new ConvexError('gift doesnt exist anymore');
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      gift.orgId
    );

    if (!hasAccess) {
      throw new ConvexError('you do not have access to this organisation');
    }

    await ctx.db.delete(args.giftId);
  },
});
