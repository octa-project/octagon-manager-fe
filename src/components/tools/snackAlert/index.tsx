import { enqueueSnackbar, VariantType } from 'notistack';

export default {
  default(msg: string) {
    this.toast(msg, 'default')
  },
  success(msg: string) {
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant: VariantType) {
    enqueueSnackbar(msg, { variant, anchorOrigin: {horizontal: "right", vertical: "top"} })
  }
}