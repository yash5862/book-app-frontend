import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ReactComponent as ConfirmSvg } from "../assets/confirm.svg";
import SvgContainer from "./SvgContainer";

type ConfirmDialogProps = {
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title?: string;
};

const ConfirmDialog = ({
  description,
  onClose,
  onConfirm,
  open,
  title = "Delete Record",
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogContent sx={{ textAlign: "center" }}>
        <SvgContainer>
          <ConfirmSvg style={{ maxWidth: 280, width: "100%" }} />
        </SvgContainer>
        <DialogTitle id="confirm-dialog-title" sx={{ pb: 1, pt: 0 }}>
          {title}
        </DialogTitle>
        {description && (
          <DialogContentText id="confirm-dialog-description">
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button autoFocus onClick={onConfirm} variant="contained">
          Confim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
