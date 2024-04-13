import {create} from 'zustand'

export interface qrState {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    result: string
    setResult: (result: string) => void
}

export const useQr = create((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({isOpen}),
    result: "",
    setResult: (result: string) => set({result})
}))

