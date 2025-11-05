import './modal.css';
import {ReactNode} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    showCloseButton?: boolean;
    closeButtonText?: string;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    closeButtonText = "Close"
}: ModalProps) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleBackdropClick}>
            <div>
                <div>
                    <h2>{title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>
                <div>
                    {children}
                </div>
                {showCloseButton && (
                    <div>
                        <button onClick={onClose}>
                            {closeButtonText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
