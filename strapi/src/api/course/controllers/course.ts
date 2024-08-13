// import { factories } from "@strapi/strapi";

// export default factories.createCoreController(
//   "api::course.course",
//   ({ strapi }) => ({
//     async find(ctx) {
//       const user = ctx.state.user;
//       ctx.query.filters = {
//         ...ctx.query.filters,
//         user: {
//           id: user.id,
//         },
//       };
//       return super.find(ctx);
//     },
//   })
// );
