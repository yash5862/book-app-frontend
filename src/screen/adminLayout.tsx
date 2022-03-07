import Box from "@material-ui/core/Box";
import AdminDrawer from "./AdminDrawer";
import Toolbar from "@material-ui/core/Toolbar";

const AdminLayout = ({ Children: ReactComponent }: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 }, overflow: "auto" }}
      >
        <Toolbar />
        <ReactComponent />
      </Box>
    </Box>
  );
};

export default AdminLayout;
