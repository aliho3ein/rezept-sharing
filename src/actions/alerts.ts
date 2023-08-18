import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timerProgressBar: true,
  position: "top",
  backdrop: false,
  customClass: {
    popup: "alertMassage",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

type iconType = "success" | "error" | "warning" | "info" | "question";

export const alertMassage = (
  title: string,
  icon: iconType = "success",
  timer = 3000
): void => {
  Toast.fire({
    icon,
    title,
    timer,
  });
};
