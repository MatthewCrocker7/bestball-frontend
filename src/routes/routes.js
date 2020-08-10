import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Home layout
import DashboardPage from "../views/Dashboard/Dashboard.js";
import UserProfile from "../views/UserProfile/UserProfile.js";
import TableList from "../views/TableList/TableList.js";
import Typography from "../views/Typography/Typography.js";
import NotificationsPage from "../views/Notifications/Notifications.js";
import NewGame from "../views/NewGame/NewGame.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/home"
  },
  {
    path: "/user",
    name: "Profile",
    icon: Person,
    component: UserProfile,
    layout: "/home"
  },
  {
    path: "/table",
    name: "Games",
    icon: "content_paste",
    component: TableList,
    layout: "/home"
  },
  {
    path: "/typography",
    name: "History",
    icon: LibraryBooks,
    component: Typography,
    layout: "/home"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/home"
  },
  {
    path: "/new-game",
    name: "New Game",
    icon: Unarchive,
    component: NewGame,
    layout: "/home"
  }
];

export default dashboardRoutes;
