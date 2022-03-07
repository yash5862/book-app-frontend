import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

interface User {
  name: string;
  author: string;
  price?: any;
  ISBN: any;
}

type UserDialogProps = {
  onAdd: (user: Partial<User>) => void;
  onClose: () => void;
  onUpdate: (user: User) => void;
  open: boolean;
  user?: User;
};

const UserDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  user,
}: UserDialogProps) => {
  const editMode = Boolean(user);
  const handleSubmit = (values: any) => {
    if (user) {
      onUpdate(values);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      author: user ? user.author : "",
      price: user ? user.price : "",
      ISBN: user ? user.ISBN : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be long")
        .required("Name is required"),
      author: Yup.string()
        .max(20, "author Name must be long")
        .required("author name is required"),
      price: Yup.string()
        .max(5, "price must be long")
        .required("price is required"),
      ISBN: Yup.string()
        .max(12, "price must be long")
        .required("price is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="user-dialog-title">
          {editMode ? "Update Book Data" : "Add New Book"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth
            id="author"
            label="Author Name"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth
            id="price"
            label="Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth
            id="ISBN"
            label="ISBN"
            name="ISBN"
            value={formik.values.ISBN}
            onChange={formik.handleChange}
            error={formik.touched.ISBN && Boolean(formik.errors.ISBN)}
            helperText={formik.touched.ISBN && formik.errors.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editMode ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
