/// <reference types="react" />
import { toast } from "./index.type";
export declare function Toast({}: {}): import("react").ReactPortal | null;
export declare function sendToast({ title, content, type, duration, closable, icon, closeButton, overrides, }: toast.IndependentToastPropsType): void;
