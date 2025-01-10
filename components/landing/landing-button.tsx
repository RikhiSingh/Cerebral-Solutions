"use client";
import React from "react";

import { Modal, ModalTrigger, } from "./deps/animated-button";

interface AnimatedButtonProps {
    label: string
}

export function AnimatedButton({ label }: AnimatedButtonProps) {
    return (
        <div className="flex items-center justify-center">
            <Modal>
                <ModalTrigger className="w-48 bg-blue-600 text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 font-bold">
                        {label}
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        🧠
                    </div>
                </ModalTrigger>
            </Modal>
        </div>
    );
}
