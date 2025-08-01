import Swal from "sweetalert2";

const useSweetAlert = () => {
  const showAlert = (
    title: string,
    text: string,
    icon: "success" | "error"
  ) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "swal-confirm-button",
      },
    });
  };

  return { showAlert };
};

export default useSweetAlert;
