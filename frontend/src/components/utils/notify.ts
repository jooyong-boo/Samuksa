import { ReactElement } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifyError = (text: ReactElement | string) => {
    dismissAll();
    toast.warning(text, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
    });
};
export const notifySuccess = (text: ReactElement | string) => {
    dismissAll();
    toast.success(text, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
    });
};
const dismissAll = () => toast.dismiss();
