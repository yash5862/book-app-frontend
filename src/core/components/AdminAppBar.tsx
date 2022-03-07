import AppBar from "@material-ui/core/AppBar";
import { drawerCollapsedWidth, drawerWidth } from "../../core/config/layout";
import {useSelector} from "react-redux"

type AdminAppBarProps = {
  children: React.ReactNode;
};

const AdminAppBar = ({ children }: AdminAppBarProps) => {
  const { drawerData }: any = useSelector((state) => state);
  
  const width = drawerData.collapsed ? drawerCollapsedWidth : drawerWidth;

  return (
    <AppBar
      color="default"
      position="fixed"
      sx={{
        width: { lg: `calc(100% - ${width}px)` },
        marginLeft: { lg: width },
      }}
    >
      {children}
    </AppBar>
  );
};

export default AdminAppBar;
