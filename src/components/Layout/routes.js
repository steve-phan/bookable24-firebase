import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone"
import AboutIcon from "@mui/icons-material/PeopleOutline"
import MenuIcon from "@mui/icons-material/MenuBook"
import ContactIcon from "@mui/icons-material/ContactPhone"

const routes = [
  {
    path: "/",
    name: "Home",
    icon: HomeWorkTwoToneIcon,
  },
  {
    path: "/services",
    name: "Services",
    icon: MenuIcon,
  },

  {
    path: "/about",
    name: "About",
    icon: AboutIcon,
  },

  {
    path: "/contact",
    name: "Contact",
    icon: ContactIcon,
  },

  {
    path: "/blog",
    name: "Blog",
    icon: AboutIcon,
  },
]

export { routes }
