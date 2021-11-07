/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { slugify } = require("./utils")
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const blogPost = path.resolve("./src/templates/blog-post.tsx")
  const shopPage = path.resolve("./src/templates/ShopPage/ShopPage.tsx")

  const shopData = await graphql(`
    {
      allContentfulShopInfo {
        nodes {
          shopId
          email
        }
      }
    }
  `)

  const shopList = shopData.data.allContentfulShopInfo.nodes

  shopList.forEach((shop, i) => {
    actions.createPage({
      path: `/${shop.shopId}/`,
      component: shopPage,
      context: {
        shopName: shop.shopId,
        shopEmail: shop.email,
      },
    })
  })

  const result = await graphql(`
    {
      allContentfulMyBlog {
        nodes {
          id
          title
        }
      }
    }
  `)
  const posts = result.data.allContentfulMyBlog.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const slug = slugify(post.title)
      const previousPostSlug =
        index === 0 ? null : slugify(posts[index - 1].title)
      const nextPostSlug =
        index === posts.length - 1 ? null : slugify(posts[index + 1].title)

      actions.createPage({
        path: `/blog/${slug}`,
        component: blogPost,
        context: {
          slug,
          id: post.id,

          previousPostSlug,
          previousPostId: previousPostSlug ? posts[index - 1].id : null,

          nextPostSlug,
          nextPostId: nextPostSlug ? posts[index + 1].id : null,
        },
      })
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function (
        { context, request },
        callback
      ) {
        const regex = /^@?firebase(\/(.+))?/
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, "commonjs " + request) // <- use commonjs!
        }

        callback()
      }),
    })
  }
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
        // templates: path.resolve(__dirname, 'src/templates'),
        // scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
