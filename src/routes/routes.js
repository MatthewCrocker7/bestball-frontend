import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Home layout
import DashboardPage from "../views/Dashboard/Dashboard.js";
import UserProfile from "../views/UserProfile/UserProfile.js";
import NotificationsPage from "../views/Notifications/Notifications.js";
import NewGame from "../views/NewGame/NewGame.js";
import DraftContainer from "../views/Drafts/DraftContainer";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/home"
  },
  {
    path: "/games",
    name: "Games",
    icon: "content_paste",
    component: DraftContainer,
    layout: "/home"
  },
  {
    path: "/drafts",
    name: "Drafts",
    icon: LibraryBooks,
    component: DraftContainer,
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
