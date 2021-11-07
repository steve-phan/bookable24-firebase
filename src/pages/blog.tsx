import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import { makeStyles } from "@mui/styles"
import Typography from "@mui/material/Typography"
import { graphql, PageProps } from "gatsby"
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image"
import { Link } from "gatsby-plugin-react-i18next"
import dayjs from "dayjs"
import React from "react"

import { slugify } from "../../utils"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    gap: 16,
  },
  root: {
    maxWidth: 445,
    height: "100%",
  },
  title: {
    height: 63,
    overflow: "hidden",
  },
  description: {
    height: 90,
    overflow: "hidden",
  },
  media: {
    height: 140,
  },
})

const Blog: React.FC<PageProps<any>> = ({ location, data }) => {
  const classes = useStyles()

  // const { t } = useTranslation()
  const allPosts = data?.allContentfulMyBlog?.nodes
  return (
    <Layout location={location}>
      <SEO title="Our blog" />
      {/* <h1>{t("hello", "Hello from Contact Page")} </h1> */}
      <Grid container className={classes.container}>
        {allPosts.map((post: any, index: number) => {
          const image = getImage(post.thumbPicture) as IGatsbyImageData
          return (
            <Link to={`/blog/${slugify(post.title)}`} key={post.title}>
              <Card className={classes.root}>
                <CardActionArea>
                  <GatsbyImage image={image} alt="Image" />

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.title}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.description}
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    Aktualisiert :{" "}
                    {dayjs(post.publishDate).format("MMM/DD/YYYY")}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {post.author || "Admin"}
                  </Typography>
                </CardActions>
              </Card>
            </Link>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default Blog
export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allContentfulMyBlog {
      nodes {
        title
        author
        publishDate
        description
        thumbPicture {
          gatsbyImageData(width: 445, height: 445, cornerRadius: 10)
        }
      }
    }
  }
`
