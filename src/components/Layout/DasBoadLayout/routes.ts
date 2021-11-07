import DashboardIcon from "@mui/icons-material/Dashboard"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined"
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"

const routes = [
  {
    path: "/dashboard/",
    name: "DashBoard",
    icon: DashboardIcon,
  },

  {
    path: "/dashboard/todaybooking",
    name: "TodayBooking",
    icon: TodayOutlinedIcon,
  },

  {
    path: "/dashboard/tomorrowbooking",
    name: "TomorrowBooking",
    icon: UpdateOutlinedIcon,
  },
  {
    path: "/dashboard/allbooking",
    name: "AllBooking",
    icon: ManageSearchOutlinedIcon,
  },

  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: SettingsOutlinedIcon,
  },
]

export { routes }
