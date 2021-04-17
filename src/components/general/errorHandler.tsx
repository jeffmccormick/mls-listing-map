import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Popup } from './popup';

interface ErrorHandlerProps {
    children?: React.ReactNode;
}

interface ErrorHandlerState {
    errors?: Error[];
}

// This component is an application-wide error boundary that can catch
// errors thrown in lower components, log them, and display them to the
// user via a popup dialog
export class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {
    componentDidCatch(error: Error) {
        this.setState({ errors: [...(this.state.errors || []), error] });
    }

    private resetErrors() {
        this.setState({ errors: undefined });
    }

    render() {
        return (
            <>
                <Popup
                    title="Error"
                    isOpen={this.state.errors !== undefined && this.state.errors.length > 0}
                    confirmButtonLabel="Ok"
                    hideCancelButton
                    onConfirm={this.resetErrors}
                    onExited={this.resetErrors}
                >
                    {this.state.errors?.map((e, i) => (
                        <Typography key={i}>{e}</Typography>
                    ))}
                </Popup>
                {this.props.children}
            </>
        );
    }
}
