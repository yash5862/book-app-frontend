import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { toggleDrawer } from "../../store/drawer/drawerAction";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";

type AdminToolbarProps = {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
};

const AdminToolbar = ({ children, title, subTitle }: AdminToolbarProps) => {
  const dispacth: any = useDispatch();
  const handleDrawerToggle = () => {
    dispacth(toggleDrawer());
  };
  return (
    <Toolbar sx={{ px: { xs: 3, sm: 6 } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { lg: "none" },
          marginRight: 2,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h2" component="h1" >
          {title}
        </Typography>
        <Typography variant="h6" component="h1">
          {subTitle}
        </Typography>
      </Box>
      {children}
    </Toolbar>
  );
};

export default AdminToolbar;
