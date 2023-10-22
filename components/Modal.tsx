"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleDismiss = useCallback(() => {
        router.push("/");
    }, [router]);
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === overlay.current) {
                console.log(overlay);
                handleDismiss();
            }
        },
        [overlay, handleDismiss]
    );
    return (
        <div ref={overlay} className='modal' onClick={handleClick}>
            <button
                type='button'
                className='absolute top-4 right-8'
                onClick={handleDismiss}
            >
                <Image width={17} height={17} src='/close.svg' alt='close' />
            </button>
            <div ref={wrapper} className='modal_wrapper'>
                {children}
            </div>
        </div>
    );
};

export default Modal;
