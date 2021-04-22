import React, { FC, ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';

interface PopupProps {
    title: string;
    isOpen: boolean;
    confirmButtonLabel: string;
    disableConfirmButton?: boolean;
    hideCancelButton?: boolean;
    children?: ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    onExited?: () => void;
}

export const useStyles = makeStyles(() => ({
    buttonsContainer: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

export const Popup: FC<PopupProps> = ({
    title,
    isOpen,
    confirmButtonLabel,
    disableConfirmButton,
    hideCancelButton,
    children,
    onConfirm,
    onCancel,
    onExited,
}: PopupProps) => {
    const classes = useStyles();

    return (
        <Dialog open={isOpen} maxWidth={false} onExited={onExited}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions className={classes.buttonsContainer}>
                {!hideCancelButton && (
                    <Button onClick={onCancel} variant="outlined">
                        Cancel
                    </Button>
                )}
                <Button onClick={onConfirm} variant="contained" disabled={disableConfirmButton}>
                    {confirmButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
