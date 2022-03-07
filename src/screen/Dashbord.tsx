import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import AdminAppBar from "../core/components/AdminAppBar";
import AdminToolbar from "../core/components/AdminToolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Diloge from "./Diloge";
import Loader from "../core/components/Loader";
import {
  getAllBook,
  updateBook,
  createBook,
  deleteBook,
} from "../store/Books/bookAction";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/system";
import empty from "../core/assets/empty.svg";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmDialog from "../core/components/ConfirmDialog";

const Dashbord = () => {
  const { bookData, auth }: any = useSelector((state) => state);
  const [searchValue, setSearchValue]: any = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogueOpen, setDialogueOpen] = useState<boolean>(false);
  const [deletingItemId, setDeletingItemId] = useState<any>(undefined);
  const [bookUpdated, setBookUpdated] = useState<any>(null);
  const dispatch = useDispatch();
  const [booksValue, setbooksValue] = useState([]);
  const handleAddBook = async (value: any) => {
    await dispatch(createBook(value));
    setDialogueOpen(false);
    bookdataHanlder();
  };

  useEffect(() => {
    setbooksValue(bookData?.books);
  }, [bookData?.books]);

  const handleCloseDialog = () => {
    setBookUpdated(null);
    setDialogueOpen(false);
  };

  const handleUpdateBook = async (value: any) => {
    await dispatch(updateBook(bookUpdated?._id, value));
    setDialogueOpen(false);
    setBookUpdated(null);
    bookdataHanlder();
  };

  const handleOpenDialog = () => {
    setDialogueOpen(true);
  };

  const bookdataHanlder = () => {
    return dispatch(
      getAllBook({
        skip: rowsPerPage * page,
        limit: rowsPerPage,
      })
    );
  };

  const deleteItem = async () => {
    await dispatch(deleteBook(deletingItemId));
    setDeletingItemId(undefined);
    bookdataHanlder();
  };

  useEffect(() => {
    bookdataHanlder();
  }, []);

  const headCells: any = [
    {
      id: "#",
      align: "center",
      label: "#",
    },
    {
      id: "Name",
      align: "center",
      label: "Name",
    },
    {
      id: "Author",
      align: "center",
      label: "Author",
    },

    {
      id: "Price",
      align: "center",
      label: "Price",
    },
    {
      id: "ISBN",
      align: "center",
      label: "ISBN",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch(
      getAllBook({
        skip: rowsPerPage * newPage,
        limit: rowsPerPage,
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(
      getAllBook({
        skip: 0,
        limit: parseInt(event.target.value, 10),
      })
    );
  };

  const handleEdit = (value: any) => {
    setBookUpdated({ ...value });
    setDialogueOpen(true);
  };

  const handleSearch = (e: any) => {
    if (e.target.value && bookData?.books?.length > 0) {
      const SearchData = bookData?.books?.filter(
        (item: any) =>
          item.name.toLowerCase().match(e.target.value.toLowerCase()) ||
          item.author.toLowerCase().match(e.target.value.toLowerCase())
      );
      setbooksValue(SearchData);
    } else {
      setbooksValue(bookData?.books);
    }
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={"Books"}>
          <Fab
            aria-label="logout"
            color="primary"
            onClick={handleOpenDialog}
            size="small"
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <Loader isLoading={bookData?.loading} />

      {dialogueOpen && (
        <Diloge
          onAdd={handleAddBook}
          onClose={handleCloseDialog}
          onUpdate={handleUpdateBook}
          open={dialogueOpen}
          user={bookUpdated}
        />
      )}
      <TextField
        margin="normal"
        label="Search Here"
        name="name"
        value={searchValue}
        onChange={(e) => {
          handleSearch(e);
          setSearchValue(e.target.value);
        }}
      />
      {booksValue.length === 0 ? (
        <>
          <Box
            component="div"
            sx={{
              minWidth: "100%",
              minHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box component="img" alt="No Data Founded" src={empty} />
          </Box>
        </>
      ) : (
        <>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              sx={{
                minWidth: 600,
                borderCollapse: "separate",
                borderSpacing: "0 1rem",
              }}
            >
              <TableHead>
                <TableRow sx={{ "& th": { border: 0 } }}>
                  {headCells.map((headCell: any) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.align}
                      sx={{ py: 0 }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}

                  <TableCell align="center" sx={{ py: 0 }}>
                    {"Actions"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booksValue.map((value: any, index: any) => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={`TableRow${index}`}
                      sx={{
                        "& td": { bgcolor: "background.paper", border: 0 },
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          borderTopLeftRadius: "1rem",
                          borderBottomLeftRadius: "1rem",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{value?.name}</TableCell>
                      <TableCell align="center">{value?.author}</TableCell>
                      <TableCell align="center">{value?.price}</TableCell>
                      <TableCell align="center">{value?.ISBN}</TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          borderTopRightRadius: "1rem",
                          borderBottomRightRadius: "1rem",
                        }}
                      >
                        <List
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Avatar
                            sx={{
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleEdit(value);
                            }}
                          >
                            <EditIcon />
                          </Avatar>

                          <Avatar
                            sx={{ cursor: "pointer" }}
                            onClick={async () => {
                              setDeletingItemId(value?._id);
                            }}
                          >
                            <DeleteIcon />
                          </Avatar>
                        </List>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={bookData?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <ConfirmDialog
        open={deletingItemId !== undefined}
        description={"Are you sure you want to delete this book?"}
        onConfirm={deleteItem}
        onClose={() => setDeletingItemId(undefined)}
      />
    </React.Fragment>
  );
};

export default Dashbord;
